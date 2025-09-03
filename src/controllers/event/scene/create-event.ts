import { Scenes } from 'telegraf';
import { Scene } from '../../../types/enums';
import asyncWrapper from '../../../utils/async-wrapper';
import { WizardContext } from 'telegraf/typings/scenes';
import { cancelButton, chunkArray, errEmoji, isValidDateFormat, parseArgs } from '../../../utils';
import { menuAction } from '../../base/action';
import { FatalError, ValidateError } from '../../../utils/errors';
import { CallbackQuery } from 'telegraf/typings/core/types/typegram';
import { createEvent, getEventByUserIdWithNotModerated } from '../../../db/repository/event';
import { getUserByTgId, getUserByTgIdWithProfile } from '../../../db/repository/user';
import { getCityByName } from '../../../db/repository/city';
import { bot } from '../../../bot';
import dayjs from 'dayjs';
import { eventModerateMessage } from '../message';
import { menuMessage } from '../../base/message';

const eventDays = [
	{
		text: 'Сегодня',
		callback_data: 'select_date:0',
	},
	{
		text: 'Завтра',
		callback_data: 'select_date:1',
	},
	{
		text: 'Послезавтра',
		callback_data: 'select_date:2',
	},
];

const messages = {
	typeEventDescription: async (ctx: WizardContext) =>
		ctx.reply('📌 Укажи информацию о встрече:\n\n<i>* Чем вы будете заниматься, цель встречи.</i>', { parse_mode: 'HTML', reply_markup: { inline_keyboard: [cancelButton] } }),
	typeZone: async (ctx: WizardContext) =>
		ctx.reply('ℹ️ Укажи район города, в котором будет проходить встреча', { parse_mode: 'HTML', reply_markup: { inline_keyboard: [cancelButton] } }),
	typeLocation: async (ctx: WizardContext) =>
		ctx.reply('ℹ️ Укажи точную локацию, в котором будет проходить встреча\n\n<i>* Вы можете пропустить и написать лично в лс тому, кто откликнется на вашу заявку.</i>', {
			parse_mode: 'HTML',
			reply_markup: { inline_keyboard: [[{ text: 'Пропустить', callback_data: 'skip' }], cancelButton] },
		}),
	selectEventDate: async (ctx: WizardContext) =>
		ctx.reply('🌠 Выбери или напиши сам дату встречи:\n\n<i>* Пример: 22.02</i>', {
			parse_mode: 'HTML',
			reply_markup: { inline_keyboard: [...chunkArray(eventDays, 2), cancelButton] },
		}),
	selectEventTime: async (ctx: WizardContext) =>
		ctx.reply('🕰 Укажи время встречи:\n\n<i>* Пример: 17:50</i>', { parse_mode: 'HTML', reply_markup: { inline_keyboard: [cancelButton] } }),
	eventCreated: async (ctx: WizardContext) => ctx.reply('✅ Событие создано и отправлено на модерацию!'),
};

export const createEventScene = new Scenes.WizardScene<WizardContext>(
	Scene.create_event,
	asyncWrapper(async ctx => {
		if (ctx.callbackQuery) await ctx.answerCbQuery();

		const user = await getUserByTgId(ctx.from!.id);
		if (!user) throw new FatalError('Пользователь не найден', true, true);

		const eventExists = await getEventByUserIdWithNotModerated(user.id);
		if (eventExists) {
			await ctx.reply(`${errEmoji} У вас уже есть событие на модерации`);
			return menuAction(ctx, true);
		}

		await messages.typeEventDescription(ctx);
		return ctx.wizard.next();
	}),
	asyncWrapper(async ctx => {
		const desc = ctx.text?.trim();
		if (!desc) throw new ValidateError('Введите информацию о встрече');
		else if (desc.length < 5) throw new ValidateError('Минимально 5 символов');
		else if (desc.length > 256) throw new ValidateError('Максимально 256 символов');

		(ctx.scene.state as any).description = desc;

		await messages.typeZone(ctx);
		return ctx.wizard.next();
	}),
	asyncWrapper(async ctx => {
		const text = ctx.text?.trim();
		if (!text) throw new ValidateError('Укажи район города, в котором будет проходить встреча');
		else if (text.length < 2) throw new ValidateError('Минимально 2 символа');
		else if (text.length > 16) throw new ValidateError('Максимально 16 символов');

		(ctx.scene.state as any).zone = text;

		await messages.typeLocation(ctx);
		return ctx.wizard.next();
	}),
	asyncWrapper(async ctx => {
		if (ctx.callbackQuery) await ctx.answerCbQuery();
		const text = ctx.text?.trim();
		const callbackData = (ctx?.callbackQuery as CallbackQuery.DataQuery)?.data;

		if (!text && callbackData !== 'skip') throw new ValidateError('Укажи точное место, в котором будет проходить встреча или пропусти');
		else if (!callbackData && text && text.length < 2) throw new ValidateError('Минимально 2 символа');
		else if (!callbackData && text && text.length > 32) throw new ValidateError('Максимально 32 символа');

		(ctx.scene.state as any).location = callbackData === 'skip' ? null : text;

		await messages.selectEventDate(ctx);
		return ctx.wizard.next();
	}),
	asyncWrapper(async ctx => {
		if (ctx.callbackQuery) await ctx.answerCbQuery();

		const text = ctx.text?.trim() || '';

		let [_, plusDay] = parseArgs(ctx);
		let date: Date | null = null;
		if (plusDay || plusDay === 0) {
			date = new Date();
			date.setDate(date.getDate() + plusDay);
		} else {
			if (!isValidDateFormat(text)) throw new ValidateError('Неверный формат даты');
			const [day, month] = text.split('.').map(Number);
			if (!day || !month) throw new ValidateError('Неверный формат даты');

			date = new Date();
			date = new Date(date.getFullYear(), Math.floor(month) - 1, Math.floor(day));

			if (date.getTime() < Date.now()) throw new ValidateError('Дата не может быть в прошлом');
		}

		(ctx.scene.state as any).date = date;

		await messages.selectEventTime(ctx);
		return ctx.wizard.next();
	}),
	asyncWrapper(async ctx => {
		if (ctx.callbackQuery) await ctx.answerCbQuery();
		const text = ctx.text?.trim();
		if (!text) throw new ValidateError('Неверный формат времени');

		const [hour, minute] = text.split(':').map(Number);
		if ((!hour && hour !== 0) || (!minute && minute !== 0)) throw new ValidateError('Неверный формат времени');
		else if (hour < 0 || hour > 23) throw new ValidateError('Неверный формат времени');
		else if (minute < 0 || minute > 59) throw new ValidateError('Неверный формат времени');

		let date = (ctx.scene.state as any).date as Date;
		date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0, 0);

		if (date.getTime() < new Date().getTime()) throw new ValidateError('Дата не может быть в прошлом');

		(ctx.scene.state as any).date = date;

		const { user, profile } = await getUserByTgIdWithProfile(ctx.from!.id);
		if (!user || !profile) throw new FatalError('Пользователь или профиль не найдены', true, true);

		const city = await getCityByName(profile.city);
		if (!city) throw new FatalError('Город не найден', true, true);

		const event = await createEvent({
			description: (ctx.scene.state as any).description as string,
			eventDate: (ctx.scene.state as any).date as Date,
			userId: user.id,
			profileId: profile.id,
			zone: (ctx.scene.state as any).zone as string,
			location: (ctx.scene.state as any).location as string,
			publicChannelId: city.publicChannelId,
			moderateChannelId: city.moderateChannelId,
		});

		if (!event) throw new FatalError('Событие не создано', true, true);

		await eventModerateMessage(user, profile, event);

		console.log(event);

		await messages.eventCreated(ctx);
		await menuAction(ctx, true);
		return ctx.scene.leave();
	})
);

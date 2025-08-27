import { Scenes } from 'telegraf';
import { Scene } from '../../../types/enums';
import asyncWrapper from '../../../utils/async-wrapper';
import { WizardContext } from 'telegraf/typings/scenes';
import { chunkArray, isValidDateFormat, parseArgs } from '../../../utils';
import { menuAction } from '../../base/action';
import { FatalError, ValidateError } from '../../../utils/errors';
import { CallbackQuery } from 'telegraf/typings/core/types/typegram';
import { createEvent } from '../../../db/repository/event';
import { getUserByTgId, getUserByTgIdWithProfile } from '../../../db/repository/user';
import { getCityByName } from '../../../db/repository/city';
import { bot } from '../../../bot';
import dayjs from 'dayjs';
import { eventModerateMessage } from '../message';

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
		ctx.reply('📌 Укажи информацию о встрече:\n\n<i>* Сколько тебе лет, чем вы будете заниматься, цель встречи.</i>', { parse_mode: 'HTML' }),
	selectEventDate: async (ctx: WizardContext) =>
		ctx.reply('🌠 Выбери или напиши сам дату встречи:\n\n<i>* Пример: 22.02</i>', { parse_mode: 'HTML', reply_markup: { inline_keyboard: [...chunkArray(eventDays, 2)] } }),
	selectEventTime: async (ctx: WizardContext) => ctx.reply('🕰 Укажи время встречи:\n\n<i>* Пример: 17:50</i>', { parse_mode: 'HTML' }),
	selectUsernameHide: async (ctx: WizardContext) =>
		ctx.reply('❗️ Показывать ли твой телеграм тег для связи при отклике?', {
			parse_mode: 'HTML',
			reply_markup: {
				inline_keyboard: [
					[
						{ text: 'Да', callback_data: 'yes' },
						{ text: 'Нет', callback_data: 'no' },
					],
				],
			},
		}),
	selectPhotosHide: async (ctx: WizardContext) =>
		ctx.reply('❗️ Показывать ли твои фотографии из анкеты?', {
			parse_mode: 'HTML',
			reply_markup: {
				inline_keyboard: [
					[
						{ text: 'Да', callback_data: 'yes' },
						{ text: 'Нет', callback_data: 'no' },
					],
				],
			},
		}),
};

export const createEventScene = new Scenes.WizardScene<WizardContext>(
	Scene.create_event,
	asyncWrapper(async ctx => {
		if (ctx.callbackQuery) await ctx.answerCbQuery();
		await messages.typeEventDescription(ctx);
		return ctx.wizard.next();
	}),
	asyncWrapper(async ctx => {
		const desc = ctx.text?.trim();
		if (!desc) throw new ValidateError('Введите информацию о встрече');
		else if (desc.length < 5) throw new ValidateError('Минимально 5 символов');
		else if (desc.length > 256) throw new ValidateError('Максимально 256 символов');

		(ctx.scene.state as any).description = desc;

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
			date = new Date(date.getFullYear(), month - 1, day);
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

		(ctx.scene.state as any).date = date;

		await messages.selectUsernameHide(ctx);
		return ctx.wizard.next();
	}),
	asyncWrapper(async ctx => {
		if (ctx.callbackQuery) await ctx.answerCbQuery();
		else throw new ValidateError('Выбери "Да" или "Нет"');

		let usernameHide: boolean = false;
		if ((ctx.callbackQuery as CallbackQuery.DataQuery)?.data === 'yes') usernameHide = false;
		else if ((ctx.callbackQuery as CallbackQuery.DataQuery)?.data === 'no') usernameHide = true;
		else throw new ValidateError('Выбери "Да" или "Нет"');

		(ctx.scene.state as any).usernameHide = usernameHide;

		await messages.selectPhotosHide(ctx);
		return ctx.wizard.next();
	}),
	asyncWrapper(async ctx => {
		if (ctx.callbackQuery) await ctx.answerCbQuery();
		else throw new ValidateError('Выбери "Да" или "Нет"');

		let isPhotoHide: boolean = false;
		if ((ctx.callbackQuery as CallbackQuery.DataQuery)?.data === 'yes') isPhotoHide = false;
		else if ((ctx.callbackQuery as CallbackQuery.DataQuery)?.data === 'no') isPhotoHide = true;
		else throw new ValidateError('Выбери "Да" или "Нет"');

		(ctx.scene.state as any).isPhotoHide = isPhotoHide;

		const { user, profile } = await getUserByTgIdWithProfile(ctx.from!.id);
		if (!user || !profile) throw new FatalError('Пользователь или профиль не найдены', true, true);

		const city = await getCityByName(profile.city);
		if (!city) throw new FatalError('Город не найден', true, true);

		const event = await createEvent({
			description: (ctx.scene.state as any).description as string,
			eventDate: (ctx.scene.state as any).date as Date,
			isUsernameHide: (ctx.scene.state as any).usernameHide as boolean,
			isPhotoHide: (ctx.scene.state as any).isPhotoHide as boolean,
			userId: user.id,
			profileId: profile.id,
			publicChannelId: city.publicChannelId,
			moderateChannelId: city.moderateChannelId,
		});

		if (!event) throw new FatalError('Событие не создано', true, true);

		await ctx.telegram.sendMessage(event.moderateChannelId, eventModerateMessage(user, profile, event, ctx.botInfo), {
			parse_mode: 'HTML',
			reply_markup: {
				inline_keyboard: [
					[
						{ text: '✅ Одобрить', callback_data: `approve_event:${event.id}` },
						{ text: '❌ Отклонить', callback_data: `reject_event:${event.id}` },
					],
				],
			},
		});

		console.log(event);

		await menuAction(ctx);
		return ctx.scene.leave();
	})
);

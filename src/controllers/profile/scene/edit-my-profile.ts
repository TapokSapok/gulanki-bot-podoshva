import { Context, Scenes } from 'telegraf';
import { Scene } from '../../../types/enums';
import asyncWrapper from '../../../utils/async-wrapper';
import { WizardContext } from 'telegraf/typings/scenes';
import { chunkArray, errEmoji, parseArgs } from '../../../utils';
import { CityType } from '../../../db/schema/city';
import { getAllCities, getCityById } from '../../../db/repository/city';
import { FatalError, ValidateError } from '../../../utils/errors';
import { CallbackQuery } from 'telegraf/typings/core/types/typegram';
import { updateProfile } from '../../../db/repository/profile';
import { myProfileAction } from '../action';
import { getUserByTgIdWithProfile } from '../../../db/repository/user';

export const cancelButton = [{ text: '× Отменить', callback_data: 'CANCEL_WIZARD:my_profile' }];

const messages = {
	typeName: async ctx => ctx[ctx.callbackQuery ? 'editMessageText' : 'reply']('👤 Введите ваше имя:', { reply_markup: { inline_keyboard: [cancelButton] } }),
	typeAge: async ctx => ctx[ctx.callbackQuery ? 'editMessageText' : 'reply']('🏮 Введите ваш возраст:', { reply_markup: { inline_keyboard: [cancelButton] } }),
	selectCity: async (ctx, cities: CityType[]) =>
		ctx[ctx.callbackQuery ? 'editMessageText' : 'reply']('🌏 Выберите свой город:', {
			reply_markup: {
				inline_keyboard: [
					...chunkArray(
						cities.map(city => ({ text: city.name, callback_data: `select_city:${city.id}` })),
						2
					),
					cancelButton,
				],
			},
		}),

	changePhotos: async ctx =>
		ctx[ctx.callbackQuery ? 'editMessageText' : 'reply']('📸 Отправь новые фотки\n\n<i>* До 3-х штук. В формате фото, не документа</i>', {
			parse_mode: 'HTML',
			reply_markup: { inline_keyboard: [cancelButton] },
		}),
	selectedPhotos: async (ctx, photos: string[]) =>
		ctx.sendMediaGroup(
			photos.map((p, i) => {
				return { type: 'photo', media: p, caption: i === 0 ? '🗃 Ваши выбранные фото' : undefined };
			})
		),
	selectPhotoAction: async ctx =>
		ctx.reply('Выберите действие 👇', {
			reply_markup: {
				inline_keyboard: [
					[
						{ text: '✅ Сохранить выбранные фото', callback_data: 'end_photos' },
						{ text: '✏️ Выбрать другие фото', callback_data: 'change_photos' },
					],
					cancelButton,
				],
			},
		}),
	aboutMe: async ctx =>
		ctx[ctx.callbackQuery ? 'editMessageText' : 'reply']('✍️ Расскажи о себе\n\n<i>* Максимум 256 символов</i>', {
			parse_mode: 'HTML',
			reply_markup: {
				inline_keyboard: [[{ text: 'Пропустить', callback_data: 'skip' }], cancelButton],
			},
		}),
	quantityCanSend: async (ctx, photosLength: number) =>
		ctx.reply(`➕ Ты можешь добавить еще ${3 - photosLength} фото.`, {
			reply_markup: { inline_keyboard: [[{ text: 'Сохранить выбранные фото', callback_data: 'end_photos:true' }], cancelButton] },
		}),
	tooManyPhotos: async ctx =>
		ctx.reply('🐤 Вы отправили слишком много фото. Сохранить первые 3?', {
			reply_markup: { inline_keyboard: [[{ text: 'Сохранить выбранные фото', callback_data: 'end_photos' }], cancelButton] },
		}),
};

const errors = {
	async nameLength(ctx) {
		return ctx.reply(`${errEmoji} Имя должно быть до 16 символов`);
	},
	async ageShouldBeNumber(ctx) {
		return ctx.reply(`${errEmoji} Возраст должен быть числом`);
	},
	async ageMoreThan(ctx, age: number) {
		return ctx.reply(`${errEmoji} Вам должно быть не меньше ${age} лет!`);
	},
	async ageLessThan(ctx, age: number) {
		return ctx.reply(`${errEmoji} Вам должно быть не больше ${age} лет!`);
	},
	async cityNotSelected(ctx) {
		return ctx.reply(`${errEmoji} Вы не выбрали город`);
	},
	async yourSentNotAPhoto(ctx) {
		return ctx.reply(`${errEmoji} Вы отправили не фото`);
	},
	async aboutMeTextMustBeLessThan(ctx) {
		return ctx.reply(`${errEmoji} Описание должно быть до 256 символов`);
	},
	async yourNotSkipAndWriteAboutMe(ctx) {
		return ctx.reply(`${errEmoji} Вы не написали о себе и не пропустили`);
	},
};

export const editMyProfileScene = new Scenes.WizardScene<WizardContext>(
	Scene.edit_my_profile,
	asyncWrapper(async ctx => {
		if (ctx.callbackQuery) await ctx.answerCbQuery();

		const editKey = (ctx.scene.state as any).args[1] as 'name' | 'age' | 'city' | 'photo' | 'aboutMe';

		if (editKey === 'name') {
			await messages.typeName(ctx);
		} else if (editKey === 'age') {
			await messages.typeAge(ctx);
		} else if (editKey === 'city') {
			const cities = await getAllCities();
			if (!cities.length) throw new FatalError('Города не найдены', true, true);
			await messages.selectCity(ctx, cities);
		} else if (editKey === 'aboutMe') {
			await messages.aboutMe(ctx);
		} else if (editKey === 'photo') {
			await messages.changePhotos(ctx);
		} else {
			throw new FatalError('Неверный ключ', true, true);
		}

		return ctx.wizard.next();
	}),
	asyncWrapper(async ctx => {
		if (ctx.callbackQuery) await ctx.answerCbQuery();

		const text = ctx.text?.trim();
		const editKey = (ctx.scene.state as any).args[1] as 'name' | 'age' | 'city' | 'photo' | 'aboutMe';

		let value: any;

		if (editKey === 'name') {
			if (ctx.callbackQuery) throw new ValidateError('Неверный формат', true);
			if (!text || text.length > 16) return await errors.nameLength(ctx);

			value = text;
		} else if (editKey === 'age') {
			if (ctx.callbackQuery) throw new ValidateError('Неверный формат', true);
			let age = Number(ctx.text?.trim());
			if (!age || Number.isNaN(age)) return await errors.ageShouldBeNumber(ctx);
			age = Math.floor(age);
			if (age < 16) return await errors.ageMoreThan(ctx, 16);
			if (age > 80) return await errors.ageLessThan(ctx, 80);

			value = age;
		} else if (editKey === 'city') {
			if (ctx.callbackQuery) await ctx.answerCbQuery();
			const [_, cityId] = parseArgs(ctx);
			if (!cityId) return await errors.cityNotSelected(ctx);

			const city = await getCityById(cityId);
			if (!city) return await errors.cityNotSelected(ctx);

			value = city.name;
		} else if (editKey === 'aboutMe') {
			if (ctx.callbackQuery) await ctx.answerCbQuery();
			const [skip] = parseArgs(ctx);

			if (text && text.length > 256) return await errors.aboutMeTextMustBeLessThan(ctx);
			if (!text && skip !== 'skip') return await errors.yourNotSkipAndWriteAboutMe(ctx);

			value = skip === 'skip' ? null : text;
		} else if (editKey === 'photo') {
			if (ctx.callbackQuery) await ctx.answerCbQuery();

			if (!Array.isArray((ctx.scene.state as any)?.value)) {
				(ctx.scene.state as any).value = [];
			}

			const photos = (ctx.message as any)?.photo?.map((photo: any) => photo.file_id);
			const savedPhotos = (ctx.scene.state as any).value;
			const args = parseArgs(ctx);

			if (!photos?.length && args[0] !== 'end_photos' && args[0] !== 'change_photos') {
				return await errors.yourSentNotAPhoto(ctx);
			} else if (args[0] === 'end_photos') {
				if (args[1] === true) {
					await messages.selectedPhotos(ctx, savedPhotos);
					return await messages.selectPhotoAction(ctx);
				} else {
					const { profile, user } = await getUserByTgIdWithProfile(ctx.from!.id);
					if (!profile || !user) throw new FatalError('Профиль/пользователь не найдены', true, true);

					await updateProfile(profile.id, { [editKey]: (ctx.scene.state as any).value });

					await myProfileAction(ctx);
					return ctx.scene.leave();
				}
			} else if (args[0] === 'change_photos') {
				(ctx.scene.state as any).value = [];
				return await messages.changePhotos(ctx);
			} else if (photos?.length) {
				if (savedPhotos.length >= 3) {
					return await messages.tooManyPhotos(ctx);
				}

				(ctx.scene.state as any).value.push(photos?.at(-1) as string);
				if ((ctx.scene.state as any).value.length < 3) {
					return await messages.quantityCanSend(ctx, (ctx.scene.state as any).value.length);
				} else {
					await messages.selectedPhotos(ctx, savedPhotos);
					return await messages.selectPhotoAction(ctx);
				}
			}
		}

		const { profile, user } = await getUserByTgIdWithProfile(ctx.from!.id);
		if (!profile || !user) throw new FatalError('Профиль/пользователь не найдены', true, true);

		await updateProfile(profile.id, { [editKey]: value });

		await myProfileAction(ctx);
		return ctx.scene.leave();
	})
);

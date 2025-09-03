import { Scenes } from 'telegraf';
import { Scene } from '../../../types/enums';
import asyncWrapper from '../../../utils/async-wrapper';
import { WizardContext, WizardContextWizard } from 'telegraf/typings/scenes';
import { FatalError, ValidateError } from '../../../utils/errors';
import { chunkArray, errEmoji, parseArgs } from '../../../utils';
import { CallbackQuery } from 'telegraf/typings/core/types/typegram';
import { createProfile } from '../../../db/repository/profile';
import { getUserByTgId } from '../../../db/repository/user';
import { menuAction } from '../../base/action';
import { getAllCities, getCityById } from '../../../db/repository/city';
import { CityType } from '../../../db/schema/city';

const messages = {
	typeName: async ctx => ctx.reply('👤 Введите ваше имя:'),
	typeAge: async ctx => ctx.reply('🏮 Введите ваш возраст:'),
	selectCity: async (ctx, cities: CityType[]) =>
		ctx.reply('🌏 Выберите свой город:', {
			reply_markup: {
				inline_keyboard: [
					...chunkArray(
						cities.map(city => ({ text: city.name, callback_data: `select_city:${city.id}` })),
						2
					),
				],
			},
		}),
	sendPhoto: async ctx =>
		ctx.reply('📸 Теперь отправь свои фотки\n\n<i>* До 3-х штук. В формате фото, не документа</i>', {
			parse_mode: 'HTML',
		}),
	changePhotos: async ctx =>
		ctx.reply('📸 Отправь новые фотки\n\n<i>* До 3-х штук. В формате фото, не документа</i>', {
			parse_mode: 'HTML',
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
				inline_keyboard: [[{ text: '✅ Сохранить выбранные фото', callback_data: 'end_photos' }], [{ text: '✏️ Выбрать другие фото', callback_data: 'change_photos' }]],
			},
		}),
	aboutMe: async ctx =>
		ctx.reply('✍️ Расскажи о себе\n\n<i>* Максимум 256 символов</i>', {
			parse_mode: 'HTML',
			reply_markup: { inline_keyboard: [[{ text: 'Пропустить', callback_data: 'skip' }]] },
		}),
	quantityCanSend: async (ctx, photosLength: number) =>
		ctx.reply(`➕ Ты можешь добавить еще ${3 - photosLength} фото.`, {
			reply_markup: { inline_keyboard: [[{ text: 'Сохранить выбранные фото', callback_data: 'end_photos:true' }]] },
		}),
	tooManyPhotos: async ctx =>
		ctx.reply('🐤 Вы отправили слишком много фото. Сохранить первые 3?', {
			reply_markup: { inline_keyboard: [[{ text: 'Сохранить выбранные фото', callback_data: 'end_photos' }]] },
		}),
	profileCreated: async ctx => ctx.reply('Профиль создан 💫'),
};

// МОЖНО БЫЛО И ОБЫЧНЫМ ValidateError
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

export const createProfileScene = new Scenes.WizardScene<WizardContext>(
	Scene.create_profile,
	asyncWrapper(async ctx => {
		if (ctx.callbackQuery) await ctx.answerCbQuery();
		await messages.typeName(ctx);

		return ctx.wizard.next();
	}),
	asyncWrapper(async ctx => {
		const name = ctx.text?.trim();

		if (!name || name.length > 16) return await errors.nameLength(ctx);
		(ctx.scene.state as any).name = name;

		await messages.typeAge(ctx);
		return ctx.wizard.next();
	}),
	asyncWrapper(async ctx => {
		const age = Number(ctx.text?.trim());

		if (!age || Number.isNaN(age)) return await errors.ageShouldBeNumber(ctx);
		if (age < 16) return await errors.ageMoreThan(ctx, 16);
		if (age > 80) return await errors.ageLessThan(ctx, 80);

		(ctx.scene.state as any).age = Math.floor(age);

		const cities = await getAllCities();
		if (!cities.length) throw new FatalError('Города не найдены', true, true);

		await messages.selectCity(ctx, cities);
		return ctx.wizard.next();
	}),
	asyncWrapper(async ctx => {
		if (ctx.callbackQuery) await ctx.answerCbQuery();
		const [_, cityId] = parseArgs(ctx);
		if (!cityId) return await errors.cityNotSelected(ctx);

		const city = await getCityById(cityId);
		if (!city) return await errors.cityNotSelected(ctx);

		(ctx.scene.state as any).city = city;

		await messages.sendPhoto(ctx);
		return ctx.wizard.next();
	}),
	asyncWrapper(async ctx => {
		if (ctx.callbackQuery) await ctx.answerCbQuery();

		if (!Array.isArray((ctx.scene.state as any)?.photos)) {
			(ctx.scene.state as any).photos = [];
		}

		const photos = (ctx.message as any)?.photo?.map((photo: any) => photo.file_id);
		const savedPhotos = (ctx.scene.state as any).photos;
		const args = parseArgs(ctx);

		if (!photos?.length && args[0] !== 'end_photos' && args[0] !== 'change_photos') {
			return await errors.yourSentNotAPhoto(ctx);
		} else if (args[0] === 'end_photos') {
			if (args[1] === true) {
				await messages.selectedPhotos(ctx, savedPhotos);
				return await messages.selectPhotoAction(ctx);
			} else {
				await messages.aboutMe(ctx);
				return ctx.wizard.next();
			}
		} else if (args[0] === 'change_photos') {
			(ctx.scene.state as any).photos = [];
			return await messages.changePhotos(ctx);
		} else if (photos?.length) {
			if (savedPhotos.length >= 3) {
				return await messages.tooManyPhotos(ctx);
			}

			(ctx.scene.state as any).photos.push(photos?.at(-1) as string);
			if ((ctx.scene.state as any).photos.length < 3) {
				return await messages.quantityCanSend(ctx, (ctx.scene.state as any).photos.length);
			} else {
				await messages.selectedPhotos(ctx, savedPhotos);
				return await messages.selectPhotoAction(ctx);
			}
		}
	}),
	asyncWrapper(async ctx => {
		if (ctx.callbackQuery) await ctx.answerCbQuery();
		const aboutMe = ctx.text?.trim();
		const [skip] = parseArgs(ctx);

		if (aboutMe && aboutMe.length > 256) return await errors.aboutMeTextMustBeLessThan(ctx);
		if (!aboutMe && skip !== 'skip') return await errors.yourNotSkipAndWriteAboutMe(ctx);

		const user = await getUserByTgId(ctx.from!.id);
		if (!user) throw new FatalError('Пользователь не найден', true, true);

		const profile = await createProfile({
			age: (ctx.scene.state as any).age,
			city: ((ctx.scene.state as any).city as CityType).name,
			name: (ctx.scene.state as any).name,
			photo: (ctx.scene.state as any).photos as string[],
			userId: user.id,
			aboutMe: skip === 'skip' ? undefined : aboutMe,
		});

		console.log(profile);

		await messages.profileCreated(ctx);
		await menuAction(ctx);
		return ctx.scene.leave();
	})
);

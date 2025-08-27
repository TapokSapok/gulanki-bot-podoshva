import { Context } from 'telegraf';
import { createUser, getUserByTgIdWithProfile } from '../db/repository/user';
import { CallbackQuery } from 'telegraf/typings/core/types/typegram';
import { FatalError } from '../utils/errors';

export default async function authMiddleware(ctx: Context, next: Function) {
	if (!ctx.from) return next();

	try {
		if (!ctx.from.username) throw new FatalError('Что бы пользоваться ботом, нужно указать телеграм тег!', true, true);

		let { user, profile } = await getUserByTgIdWithProfile(ctx.from.id);

		if (!user) {
			user = await createUser({ tg_id: ctx.from.id, username: ctx.from.username, firstName: ctx.from.first_name });
		}

		if (user.isBanned) {
			return await ctx.reply('🚫 Ты забанен, соси жирный член');
		}

		if (!profile) {
			if ((ctx?.callbackQuery as CallbackQuery.DataQuery)?.data === 'create_profile') return next();

			return await ctx.reply('У тебя нет профиля, нажми на кнопку для создания 👋', {
				reply_markup: { inline_keyboard: [[{ text: '➕ Создать профиль', callback_data: 'create_profile' }]] },
			});
		}

		next();
	} catch (error) {
		console.error(error);
	}
}

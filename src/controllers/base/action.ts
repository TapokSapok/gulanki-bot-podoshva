import { Context } from 'telegraf';
import { menuMessage, moderateProfileText } from './message';
import { getEventById } from '../../db/repository/event';
import { errEmoji } from '../../utils';
import { getUserByTgId, getUserByTgIdWithProfile } from '../../db/repository/user';
import { getEventRequest } from '../../db/repository/event-request';

export async function menuAction(ctx: Context, isReply: boolean = false) {
	if (ctx.callbackQuery) await ctx.answerCbQuery();

	try {
		const { type, value } = JSON.parse(atob(ctx.payload));

		if (type === 'event_request' && !Number.isNaN(value)) {
			const { event, profile, user } = await getEventById(value);
			if (!event || !profile || !user) {
				await ctx.reply(`${errEmoji} Событие/пользователь/профиль не найдены`);
				return menuAction(ctx);
			}

			const requestUser = await getUserByTgId(ctx.from!.id);
			if (!requestUser) return await ctx.reply(`${errEmoji} Пользователь не найден`);

			if (requestUser.tg_id === user.tg_id) return await ctx.reply(`${errEmoji} Нельзя отправить запрос самому себе`);

			const evtReq = await getEventRequest(requestUser.id, event.id);
			console.log(evtReq);
			if (evtReq) return await ctx.reply(`${errEmoji} Вы уже отправляли запрос на это событие`);

			return await ctx.reply(
				`💫 Отправить запрос создателю <a href="https://t.me/${event.publicChannelUsername}/${event.publicMessageId}">события</a>?\n\n<i>* После подтверждения запроса вы получите телеграм тег и место встречи.</i>`,
				{
					parse_mode: 'HTML',
					reply_markup: {
						inline_keyboard: [
							[
								{ text: '✅ Да, отправить', callback_data: `event_request:${event.id}` },
								{ text: '❌ Нет, передумал', callback_data: 'menu' },
							],
						],
					},
					link_preview_options: { is_disabled: true },
				}
			);
		} else if (type === 'show_profile' && !Number.isNaN(value)) {
			const { user, profile } = await getUserByTgIdWithProfile(value);

			if (!user || !profile) {
				await ctx.reply(`${errEmoji} Пользователь/профиль не найдены`);
				return menuAction(ctx);
			}

			return await ctx.sendMediaGroup(
				profile.photo.map((photo, index) => ({
					type: 'photo',
					media: photo,
					caption: index === 0 ? moderateProfileText(profile, user) : undefined,
					parse_mode: 'HTML',
				}))
			);
		}
	} catch (error) {
		return menuMessage(ctx, isReply);
	}
}

import { Context } from 'telegraf';
import { menuMessage, moderateProfileText } from './message';
import { getEventById } from '../../db/repository/event';
import { errEmoji } from '../../utils';
import { getUserByTgId, getUserByTgIdWithProfile } from '../../db/repository/user';

export async function menuAction(ctx: Context) {
	try {
		const { type, value } = JSON.parse(atob(ctx.payload));
		if (type === 'event_request' && !Number.isNaN(value)) {
			const { event, profile, user } = await getEventById(value);
			if (!event || !profile || !user) {
				await ctx.reply(`${errEmoji} Событие/пользователь/профиль не найдены`);
				return menuMessage(ctx);
			}

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
				return menuMessage(ctx);
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
		return menuMessage(ctx);
	}
}

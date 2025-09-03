import { Context } from 'telegraf';
import { ProfileType } from '../../db/schema/profile';
import { UserType } from '../../db/schema/user';
import { formatDate } from '../../utils';
import dayjs from 'dayjs';

export async function menuMessage(ctx: Context, isReply = false) {
	return ctx[ctx.callbackQuery && !isReply ? 'editMessageText' : 'reply']('👋 Добро пожаловать в бот гулянок!', {
		reply_markup: {
			inline_keyboard: [
				[
					{ text: '🚶 Создать заявку', callback_data: 'create_event' },
					{ text: '📰 Мой профиль', callback_data: 'my_profile' },
				],
			],
		},
	});
}

export function moderateProfileText(profile: ProfileType, user: UserType) {
	return `📰  Профиль пользователя  ⌵

💠 Айди: <code>${user.tg_id}</code>
👤 Имя: <b><i>${profile.name}</i></b>
🏮 Возраст: <b><i>${profile.age}</i></b>
🌍 Город: <b><i>${profile.city}</i></b>
🩸 Карма: <b><i>${user.karma}</i></b>

✍️ О себе: ${profile.aboutMe ? `<blockquote>${profile.aboutMe}</blockquote>` : '<i>Не указано</i>'}

ℹ️ Дата первого входа: ${formatDate(user.createdAt)} (${dayjs(user.createdAt).fromNow()})`;
}

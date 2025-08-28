import { EventType } from '../../db/schema/event';
import { ProfileType } from '../../db/schema/profile';
import { UserType } from '../../db/schema/user';
import dayjs from 'dayjs';
import { bot } from '../../bot';
import { Context } from 'telegraf';
import { ExtraEditMessageText } from 'telegraf/typings/telegram-types';
import { formatDate } from '../../utils';
import { FatalError } from '../../utils/errors';
import { EventRequestType } from '../../db/schema/event-request';

export async function eventModerateMessage(user: UserType, profile: ProfileType, event: EventType, ctx?: Context) {
	const text = `🛡 Новая заявка на проверку  ⌵

💠 <a href="t.me/${bot.botInfo?.username}?start=${btoa(JSON.stringify({ type: 'show_profile', value: user.tg_id }))}">Пользователь</a>: ${
		user.username ? `@${user.username}` : ``
	} (<a href="tg://user?id=${user.tg_id}">${user.firstName}</a>)
👤 Имя: ${profile.name}
🏮 Возраст: ${profile.age}
🌍 Город: ${profile.city}
🏙 Район: ${event.zone}
⛩ Локация: ${event.location ? event.location : '<i>Не указана</i>'}

✍️ О себе: ${profile.aboutMe ? `<blockquote>${profile.aboutMe}</blockquote>` : '<i>Не указано</i>'}

📌 Информация: <blockquote>${event.description}</blockquote>

📅 Дата события: ${formatDate(event.eventDate)}

🩸 Карма: ${user.karma}
ℹ️ Аккаунт создан: ${formatDate(user.createdAt)} (${dayjs(user.createdAt).fromNow()})

${event.isApproved ? '✅ Событие одобрено' : event.isRejected ? '❌ Событие отклонено' : ''}
${user.isBanned ? '🚫 Пользователь заблокирован.' : ''}
`;

	const extra = {
		parse_mode: 'HTML',
		reply_markup: {
			inline_keyboard: [
				!user.isBanned && !event.isApproved && !event.isRejected
					? [
							{ text: '✅ Одобрить', callback_data: `approve_event:${event.id}` },
							{ text: '❌ Отклонить', callback_data: `reject_event:${event.id}` },
					  ]
					: [],
				[
					!user.isBanned
						? {
								text: '🚫 Забанить',
								callback_data: `ban_user_event:${event.id}`,
						  }
						: null,
				].filter(b => b),
			].filter(b => b),
		},
	};

	if (ctx?.callbackQuery) {
		return ctx.editMessageText(text, extra as ExtraEditMessageText);
	} else {
		return bot.telegram.sendMessage(event.moderateChannelId, text, extra as ExtraEditMessageText);
	}
}

export async function eventPublicMessage(user: UserType, profile: ProfileType, event: EventType, ctx?: Context, isReply: boolean = false) {
	const text = `${profile.name}, ${profile.age}, ${profile.city}
	
✍️ О себе${profile.aboutMe ? `  ⌵<blockquote>${profile.aboutMe}</blockquote>` : ' - <i>Не указано</i>'}
	
📌 О событии  ⌵<blockquote>${event.description}</blockquote>

🏙 Район - ${event.zone}
📅 Дата события - ${formatDate(event.eventDate)}
🩸 Карма - ${user.karma}

💫 <a href="https://t.me/${bot.botInfo?.username}?start=${btoa(JSON.stringify({ type: 'event_request', value: event.id }))}">Откликнуться</a>
`;

	if (ctx?.callbackQuery && !isReply) {
		return ctx.editMessageCaption(text, { parse_mode: 'HTML' });
	} else {
		return bot.telegram.sendMediaGroup(
			event.publicChannelId,
			profile.photo.map((photo, index) => ({
				type: 'photo',
				media: photo,
				caption: index === 0 ? text : undefined,
				parse_mode: 'HTML',
			}))
		);
	}
}

export function eventRequestText(event: EventType, profile: ProfileType, user: UserType, eventRequest?: EventRequestType, eventRequestUser?: UserType) {
	console.log(eventRequest);
	return `💫 Вам пришел отклик на <a href="https://t.me/${event.publicChannelUsername}/${event.publicMessageId}">событие</a>.\n\n👤 ${profile.name}, ${profile.age}, ${
		profile.city
	}\n🩸 Карма - ${user.karma}\n\n${eventRequest?.isApproved ? `✅ Одобрен - @${eventRequestUser?.username}\n` : eventRequest?.isRejected ? '❌ Отклонен' : ''}${
		!event.location && eventRequest?.isApproved ? `<i>* Локация события не указана, сообщите её @${eventRequestUser?.username}</i>` : ''
	}`;
}

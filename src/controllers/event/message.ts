import { UserFromGetMe } from 'telegraf/typings/core/types/typegram';
import { EventType } from '../../db/schema/event';
import { ProfileType } from '../../db/schema/profile';
import { UserType } from '../../db/schema/user';
import dayjs from 'dayjs';

export function eventModerateMessage(user: UserType, profile: ProfileType, event: EventType, botInfo: UserFromGetMe) {
	return `🛡 Новая заявка на проверку  ⌵
				
<i>*</i>  Фотки - <i>${event.isPhotoHide ? 'Скрыто' : 'Показано'}</i>
<i>*</i>  Тег - <i>${event.isUsernameHide ? 'Скрыто' : 'Показано'}</i>

💠 <a href="t.me/${botInfo.username}">Анкета</a>: ${user.username ? `@${user.username}` : ``} (<a href="tg://user?id=${user.tg_id}">${user.firstName}</a>)
👤 Имя: ${profile.name}
🏮 Возраст: ${profile.age}
🌍 Город: ${profile.city}

✍️ О себе: ${profile.aboutMe ? `<blockquote>${profile.aboutMe}</blockquote>` : '<i>Не указано</i>'}

📌 Информация: <blockquote>${event.description}</blockquote>

📅 Дата события: ${dayjs(event.eventDate).format(`D MMMM, HH:mm`)}

🩸 Карма: ${user.karma}
ℹ️ Аккаунт создан ${dayjs(user.createdAt).fromNow()}

${event.isApproved ? '✅ Событие одобрено' : event.isRejected ? '❌ Событие отклонено' : ''}
`;
}

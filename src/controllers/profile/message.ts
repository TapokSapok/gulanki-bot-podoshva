import { Context } from 'telegraf';
import { UserType } from '../../db/schema/user';
import { ProfileType } from '../../db/schema/profile';
import { BACK_TEXT } from '../../utils';

export function profileText(profile: ProfileType, user: UserType) {
	return `📰  Твой профиль  ⌵

👤 Имя: <b><i>${profile.name}</i></b>
🏮 Возраст: <b><i>${profile.age}</i></b>
🌍 Город: <b><i>${profile.city}</i></b>
🩸 Карма: <b><i>${user.karma}</i></b>

✍️ О себе: ${profile.aboutMe ? `<blockquote>${profile.aboutMe}</blockquote>` : '<i>Не указано</i>'}`;
}

export async function myProfileMessage(ctx: Context, user: UserType, profile: ProfileType) {
	if (ctx.callbackQuery) await ctx.answerCbQuery();
	await ctx.sendMediaGroup(
		profile.photo.map((photo, index) => ({
			type: 'photo',
			media: photo,
			caption: index === 0 ? profileText(profile, user) : undefined,
			parse_mode: 'HTML',
		}))
	);

	return await ctx.reply('Выбери действие:', {
		parse_mode: 'HTML',
		reply_markup: {
			inline_keyboard: [
				[
					{ text: '👤 Изменить - Имя', callback_data: 'edit_my_profile:name' },
					{ text: '🏮 Изменить - Возраст', callback_data: 'edit_my_profile:age' },
				],
				[
					{ text: '🌍 Изменить - Город', callback_data: 'edit_my_profile:city' },
					{ text: '✍️ Изменить - О себе', callback_data: 'edit_my_profile:aboutMe' },
				],
				[{ text: '📸 Изменить - Фотографии', callback_data: 'edit_my_profile:photo' }],
				[{ text: BACK_TEXT, callback_data: 'menu' }],
			],
		},
	});
}

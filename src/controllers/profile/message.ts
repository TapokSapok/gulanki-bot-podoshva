import { Context } from 'telegraf';
import { UserType } from '../../db/schema/user';
import { ProfileType } from '../../db/schema/profile';
import { cities } from '../../types/enums';
import { BACK_TEXT } from '../../utils';

export async function myProfileMessage(ctx: Context, user: UserType, profile: ProfileType) {
	if (ctx.callbackQuery) await ctx.answerCbQuery();
	await ctx.sendMediaGroup(
		profile.photo.map((photo, index) => ({
			type: 'photo',
			media: photo,
			caption:
				index === 0
					? `📰  Твоя анкета  ⌵

👤 Имя: <b><i>${profile.name}</i></b>
🏮 Возраст: <b><i>${profile.age}</i></b>
🌍 Город: <b><i>${profile.city}</i></b>
🩸 Карма: <b><i>${user.karma}</i></b>

✍️ О себе: ${profile.aboutMe ? `<blockquote>${profile.aboutMe}</blockquote>` : '<i>Не указано</i>'}`
					: undefined,
			parse_mode: 'HTML',
		}))
	);

	return await ctx.reply('Выбери действие:', {
		parse_mode: 'HTML',
		reply_markup: {
			inline_keyboard: [[{ text: '✏️ Редактировать анкету', callback_data: 'edit_profile' }], [{ text: BACK_TEXT, callback_data: 'menu' }]],
		},
	});
}

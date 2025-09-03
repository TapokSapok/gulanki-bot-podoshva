import { Context } from 'telegraf';
import { myProfileMessage } from './message';
import { getUserByTgIdWithProfile } from '../../db/repository/user';
import { FatalError } from '../../utils/errors';

export async function myProfileAction(ctx: Context) {
	if (!ctx?.from?.id) throw new FatalError();

	const { user, profile } = await getUserByTgIdWithProfile(ctx.from.id);
	if (!user || !profile) throw new FatalError('Пользователь или профиль не найдены');

	return await myProfileMessage(ctx, user, profile);
}

export async function requestCheckProfileAction(ctx: Context) {
	if (ctx.callbackQuery) await ctx.answerCbQuery();
	const [_, tgUserId] = ctx.args;
	if (!tgUserId) throw new FatalError('Неверный формат');

	const { user, profile } = await getUserByTgIdWithProfile(tgUserId as number);
	if (!user || !profile) return await ctx.answerCbQuery('Пользователь/профиль не найдены');

	return await ctx.sendMediaGroup(
		profile.photo.map((photo, index) => ({
			type: 'photo',
			media: photo,
			caption:
				index === 0
					? `📰  Профиль пользователя  ⌵
	
	👤 Имя: <b><i>${profile.name}</i></b>
	🏮 Возраст: <b><i>${profile.age}</i></b>
	🌍 Город: <b><i>${profile.city}</i></b>
	🩸 Карма: <b><i>${user.karma}</i></b>
	
	✍️ О себе: ${profile.aboutMe ? `<blockquote>${profile.aboutMe}</blockquote>` : '<i>Не указано</i>'}
`
					: undefined,
			parse_mode: 'HTML',
		})),
		{
			reply_parameters: { message_id: ctx.callbackQuery?.message?.message_id as number },
		}
	);
}

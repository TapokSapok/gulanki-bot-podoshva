import { Context } from 'telegraf';
import { getUserByTgId, getUserByTgIdWithProfile, updateUser } from '../../db/repository/user';
import { FatalError } from '../../utils/errors';
import { getEventById } from '../../db/repository/event';
import { eventModerateMessage } from '../event/message';
import { moderateProfileText } from '../base/message';

export async function unbanUserAction(ctx: Context) {
	if (ctx.callbackQuery) await ctx.answerCbQuery();

	const tgUserId = Number(ctx.args[0]);
	if (Number.isNaN(tgUserId)) throw new FatalError('Неверный формат, укажи tg_id пользователя');

	let { user, profile } = await getUserByTgIdWithProfile(tgUserId);
	if (!user || !profile) return await ctx.answerCbQuery('Пользователь/профиль не найдены');

	if (!user.isBanned) return await ctx.reply('Пользователь и так не заблокирован');

	user = await updateUser(user.id, { isBanned: false });

	return await ctx.sendMediaGroup(
		profile.photo.map((photo, index) => ({
			type: 'photo',
			media: photo,
			caption: index === 0 ? moderateProfileText(profile, user) + '\n\n✅ Пользователь разблокирован' : undefined,
			parse_mode: 'HTML',
		}))
	);
}

export async function banUserEventAction(ctx: Context) {
	if (ctx.callbackQuery) await ctx.answerCbQuery();

	let { event, profile, user } = await getEventById(ctx.args[1] as number);
	if (!user || !profile || !event) return await ctx.answerCbQuery('Пользователь/профиль/событие не найдены');

	user = await updateUser(user.id, { isBanned: true });

	return await eventModerateMessage(user, profile, event, ctx);
}

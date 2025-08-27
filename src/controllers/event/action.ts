import { Context } from 'telegraf';
import { getEventById, updateEvent } from '../../db/repository/event';
import { errEmoji } from '../../utils';
import { bot } from '../../bot';
import { eventModerateMessage } from './message';

export async function approveEventAction(ctx: Context) {
	if (ctx.callbackQuery) await ctx.answerCbQuery();

	let { event, profile, user } = await getEventById(ctx.args[1] as number);
	if (!event || !profile || !user) return await ctx.answerCbQuery(`${errEmoji} Событие/пользователь/профиль не найдены`);

	event = await updateEvent(event.id, { isApproved: true });

	await bot.telegram.sendMessage(event.publicChannelId, 'ИВЕНТ', { parse_mode: 'HTML' });
	await ctx.editMessageText(eventModerateMessage(user, profile, event, ctx.botInfo), { parse_mode: 'HTML' });

	return await ctx.answerCbQuery('✅ Событие одобрено');
}

export async function rejectEventAction(ctx: Context) {
	if (ctx.callbackQuery) await ctx.answerCbQuery();

	let { event, profile, user } = await getEventById(ctx.args[1] as number);
	if (!event || !profile || !user) return await ctx.answerCbQuery(`${errEmoji} Событие/пользователь/профиль не найдены`);

	event = await updateEvent(event.id, { isRejected: true });

	await ctx.editMessageText(eventModerateMessage(user, profile, event, ctx.botInfo), { parse_mode: 'HTML' });

	return await ctx.answerCbQuery('✅ Событие отклонено');
}

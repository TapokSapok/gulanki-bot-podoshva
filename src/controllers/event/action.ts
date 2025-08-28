import { Context } from 'telegraf';
import { getEventById, updateEvent } from '../../db/repository/event';
import { errEmoji } from '../../utils';
import { bot } from '../../bot';
import { eventModerateMessage, eventPublicMessage, eventRequestText } from './message';
import { createEventRequest, getEventRequest, updateEventRequest } from '../../db/repository/event-request';
import { getUserByTgIdWithProfile } from '../../db/repository/user';

export async function approveEventAction(ctx: Context) {
	if (ctx.callbackQuery) await ctx.answerCbQuery();

	let { event, profile, user } = await getEventById(ctx.args[1] as number);
	if (!event || !profile || !user) return await ctx.answerCbQuery(`${errEmoji} Событие/пользователь/профиль не найдены`);

	const message = await eventPublicMessage(user, profile, event, ctx, true);
	event = await updateEvent(event.id, { isApproved: true, publicMessageId: message?.[0]?.message_id, publicChannelUsername: message?.[0]?.chat?.username });

	await eventModerateMessage(user, profile, event, ctx);
	await bot.telegram.sendMessage(user.tg_id, `✅ <a href="https://t.me/${event.publicChannelUsername}/${event.publicMessageId}">Событие одобрено</a>`, {
		parse_mode: 'HTML',
	});

	return await ctx.answerCbQuery('✅ Событие одобрено');
}

export async function rejectEventAction(ctx: Context) {
	if (ctx.callbackQuery) await ctx.answerCbQuery();

	let { event, profile, user } = await getEventById(ctx.args[1] as number);
	if (!event || !profile || !user) return await ctx.answerCbQuery(`${errEmoji} Событие/пользователь/профиль не найдены`);

	event = await updateEvent(event.id, { isRejected: true });

	await eventModerateMessage(user, profile, event, ctx);

	await bot.telegram.sendMessage(user.tg_id, `❌ Событие не прошло модерацию.`, {
		parse_mode: 'HTML',
	});

	return await ctx.answerCbQuery('✅ Событие отклонено');
}

export async function eventRequestAction(ctx: Context) {
	if (ctx.callbackQuery) await ctx.answerCbQuery();

	const { event, user: eventUser } = await getEventById(ctx.args[1] as number);
	if (!event || !eventUser) return await ctx.reply(`${errEmoji} Событие не найдены`);

	const { user, profile } = await getUserByTgIdWithProfile(ctx.from!.id);
	if (!user || !profile) return await ctx.reply(`${errEmoji} пользователь/профиль не найдены`);

	await createEventRequest({ eventId: event.id, profileId: profile.id, userId: user.id });

	await ctx.telegram.sendMessage(eventUser.tg_id, eventRequestText(event, profile, user), {
		parse_mode: 'HTML',
		link_preview_options: { is_disabled: true },
		reply_markup: {
			inline_keyboard: [
				[{ text: '📰 Посмотреть профиль', callback_data: `request_check_profile:${user.tg_id}` }],
				[
					{ text: '✅ Одобрить', callback_data: `event_request_answer:${event.id}:${user.id}:true` },
					{ text: '❌ Отклонить', callback_data: `event_request_answer:${event.id}:${user.id}:false` },
				],
			],
		},
	});

	return await ctx.editMessageText(`✅ Запрос на <a href="https://t.me/${event.publicChannelUsername}/${event.publicMessageId}">событие</a> отправлен.`, {
		parse_mode: 'HTML',
		link_preview_options: { is_disabled: true },
	});
}

export async function eventRequestAnswerAction(ctx: Context) {
	if (ctx.callbackQuery) await ctx.answerCbQuery();

	const [_, eventId, userId, isApproved] = ctx.args;

	let { eventRequest, profile, user } = await getEventRequest(userId as number, eventId as number);
	if (!eventRequest || !profile || !user) return await ctx.reply(`${errEmoji} Событие/запрос/пользователь/профиль не найдены`);

	const event = await getEventById(eventRequest.eventId);
	if (!event.event || !event.user) return await ctx.reply(`${errEmoji} Событие/пользователь не найдены`);

	if (isApproved) {
		eventRequest = await updateEventRequest(eventRequest.id, { isApproved: true });
		await updateEvent(event.event.id, { responses: event.event.responses + 1 });
		await ctx.telegram.sendMessage(
			user.tg_id,
			`✅ Ваш запрос на <a href="https://t.me/${event.event.publicChannelUsername}/${event.event.publicMessageId}">cобытие</a> одобрен!\n\n👤 Тег: @${
				event.user.username
			}\nℹ️ Точная локация: ${event.event.location ? event.event.location : `Не указана, свяжитесь с @${event.user.username} для уточнения.`}`,
			{ parse_mode: 'HTML', link_preview_options: { is_disabled: true } }
		);
	} else {
		eventRequest = await updateEventRequest(eventRequest.id, { isRejected: true });
		await ctx.telegram.sendMessage(
			user.tg_id,
			`❌ Ваш запрос на <a href="https://t.me/${event.event.publicChannelUsername}/${event.event.publicMessageId}">cобытие</a> отклонен!`,
			{ parse_mode: 'HTML', link_preview_options: { is_disabled: true } }
		);
	}

	return await ctx.editMessageText(eventRequestText(event.event, profile, user, eventRequest, user), {
		parse_mode: 'HTML',
		link_preview_options: { is_disabled: true },
		reply_markup: {
			inline_keyboard: [[{ text: '📰 Посмотреть профиль', callback_data: `request_check_profile:${user.tg_id}` }]],
		},
	});
}

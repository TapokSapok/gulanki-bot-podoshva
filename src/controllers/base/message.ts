import { Context } from 'telegraf';

export async function menuMessage(ctx: Context) {
	return ctx[ctx.callbackQuery ? 'editMessageText' : 'reply']('👋 Добро пожаловать в бот гулянок!', {
		reply_markup: {
			inline_keyboard: [
				[
					{ text: '🚶 Создать заявку', callback_data: 'create_event' },
					{ text: '📰 Моя анкета', callback_data: 'my_profile' },
				],
			],
		},
	});
}

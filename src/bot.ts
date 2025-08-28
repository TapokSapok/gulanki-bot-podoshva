import { Scenes, session, Telegraf } from 'telegraf';
import { Config } from './config';
import { parseArgsMiddleware } from './middlewares/parse-args';
import authMiddleware from './middlewares/auth-middleware';
import { createProfileScene } from './controllers/profile/scene/create-profile';
import { createEventScene } from './controllers/event/scene/create-event';
import { menuAction } from './controllers/base/action';
import { menuMessage } from './controllers/base/message';
import asyncWrapper from './utils/async-wrapper';

export const bot = new Telegraf(Config.bot.token);

bot.telegram.setMyCommands([{ command: 'start', description: 'Меню' }]);

//@ts-ignore
const stage = new Scenes.Stage<Scenes.SceneContext>([createProfileScene, createEventScene]);

stage.action(
	'CANCEL_WIZARD',
	asyncWrapper(async ctx => {
		if (ctx.callbackQuery) await ctx.answerCbQuery();
		ctx.scene.leave();
		await menuMessage(ctx);
	})
);

bot.use(session());
bot.use(stage.middleware());
bot.use(parseArgsMiddleware);
bot.use(authMiddleware);

import('./controllers/base/handler');
import('./controllers/profile/handler');
import('./controllers/city/handler');
import('./controllers/event/handler');
import('./controllers/user/handler');

bot.launch();

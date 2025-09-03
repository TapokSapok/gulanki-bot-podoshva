import { Scenes, session, Telegraf } from 'telegraf';
import { Config } from './config';
import { parseArgsMiddleware } from './middlewares/parse-args';
import authMiddleware from './middlewares/auth-middleware';
import { createProfileScene } from './controllers/profile/scene/create-profile';
import { createEventScene } from './controllers/event/scene/create-event';
import asyncWrapper from './utils/async-wrapper';
import { menuAction } from './controllers/base/action';
import { editMyProfileScene } from './controllers/profile/scene/edit-my-profile';
import { myProfileAction } from './controllers/profile/action';

export const bot = new Telegraf(Config.bot.token);

bot.telegram.setMyCommands([{ command: 'start', description: 'Меню' }]);

const stage = new Scenes.Stage<Scenes.SceneContext>([createProfileScene, createEventScene, editMyProfileScene]);

bot.use(parseArgsMiddleware);
bot.use(authMiddleware);

stage.action(
	/^CANCEL_WIZARD/,
	asyncWrapper(async ctx => {
		if (ctx.callbackQuery) await ctx.answerCbQuery();

		ctx.scene.leave();

		if (ctx.args?.[1] === 'my_profile') {
			await myProfileAction(ctx);
		} else {
			await menuAction(ctx);
		}
	})
);

stage.start(
	asyncWrapper(async ctx => {
		ctx.scene.leave();
		await menuAction(ctx);
	})
);

bot.use(session());
bot.use(stage.middleware());

import('./controllers/base/handler');
import('./controllers/profile/handler');
import('./controllers/city/handler');
import('./controllers/event/handler');
import('./controllers/user/handler');

bot.launch();

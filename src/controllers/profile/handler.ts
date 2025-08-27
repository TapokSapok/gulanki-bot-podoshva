import { Context } from 'telegraf';
import { bot } from '../../bot';
import asyncWrapper from '../../utils/async-wrapper';
import { myProfileAction } from './action';
import { Scene } from '../../types/enums';

bot.action(
	/^create_profile/,
	asyncWrapper(async ctx => ctx.scene.enter(Scene.create_profile))
);

bot.action(
	/^my_profile/,
	asyncWrapper(async ctx => await myProfileAction(ctx))
);

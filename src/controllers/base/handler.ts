import { Context } from 'telegraf';
import { bot } from '../../bot';
import asyncWrapper from '../../utils/async-wrapper';
import { menuAction } from './action';

bot.start(asyncWrapper(async ctx => await menuAction(ctx)));

bot.action(
	/^menu/,
	asyncWrapper(async ctx => await menuAction(ctx))
);

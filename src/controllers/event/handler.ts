import { bot } from '../../bot';
import { Scene } from '../../types/enums';
import asyncWrapper from '../../utils/async-wrapper';
import { approveEventAction, rejectEventAction } from './action';

bot.action(
	/^create_event/,
	asyncWrapper(async ctx => ctx.scene.enter(Scene.create_event))
);

bot.action(
	/^approve_event/,
	asyncWrapper(async ctx => await approveEventAction(ctx))
);

bot.action(
	/^reject_event/,
	asyncWrapper(async ctx => await rejectEventAction(ctx))
);

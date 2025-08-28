import { bot } from '../../bot';
import { Scene } from '../../types/enums';
import asyncWrapper from '../../utils/async-wrapper';
import { approveEventAction, eventRequestAction, eventRequestAnswerAction, rejectEventAction } from './action';

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

bot.action(
	/^event_request_answer/,
	asyncWrapper(async ctx => await eventRequestAnswerAction(ctx))
);

bot.action(
	/^event_request/,
	asyncWrapper(async ctx => await eventRequestAction(ctx))
);

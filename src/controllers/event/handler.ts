import { bot } from '../../bot';
import { Scene } from '../../types/enums';
import asyncWrapper from '../../utils/async-wrapper';
import { approveEventAction, eventRequestAction, eventRequestAnswerAction, rejectEventAction } from './action';

bot.action(/^create_event/, ctx => ctx.scene.enter(Scene.create_event));

bot.action(/^approve_event/, asyncWrapper(approveEventAction));

bot.action(/^reject_event/, asyncWrapper(rejectEventAction));

bot.action(/^event_request_answer/, asyncWrapper(eventRequestAnswerAction));

bot.action(/^event_request/, asyncWrapper(eventRequestAction));

import { bot } from '../../bot';
import asyncWrapper from '../../utils/async-wrapper';
import { banUserEventAction, unbanUserAction } from './action';

bot.command(
	/^unban/,
	asyncWrapper(async ctx => await unbanUserAction(ctx))
);

bot.action(
	/^ban_user_event/,
	asyncWrapper(async ctx => await banUserEventAction(ctx))
);

import { bot } from '../../bot';
import { checkAdminMiddleware } from '../../middlewares/check-admin-middleware';
import asyncWrapper from '../../utils/async-wrapper';
import { banUserEventAction, unbanUserAction } from './action';

bot.command(/^unban/, checkAdminMiddleware, asyncWrapper(unbanUserAction));

bot.action(/^ban_user_event/, checkAdminMiddleware, asyncWrapper(banUserEventAction));

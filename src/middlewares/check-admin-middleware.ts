import { Context } from 'telegraf';
import { getUserByTgId, getUserByTgIdWithProfile } from '../db/repository/user';
import { FatalError } from '../utils/errors';

export async function checkAdminMiddleware(ctx: Context, next: Function) {
	if (!ctx.from?.id) return next();

	const tgUserId = ctx.from.id;

	const user = await getUserByTgId(tgUserId);
	if (!user) throw new FatalError('Пользователь не найден');
	if (user.role !== 'admin') throw new FatalError('Нет доступа к этому функционалу', true, true);

	return next();
}

import { Context } from 'telegraf';
import { myProfileMessage } from './message';
import { getUserByTgIdWithProfile } from '../../db/repository/user';
import { FatalError } from '../../utils/errors';

export async function myProfileAction(ctx: Context) {
	if (!ctx?.from?.id) throw new FatalError();

	const { user, profile } = await getUserByTgIdWithProfile(ctx.from.id);
	if (!user || !profile) throw new FatalError('Пользователь или профиль не найдены');

	return await myProfileMessage(ctx, user, profile);
}

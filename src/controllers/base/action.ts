import { Context } from 'telegraf';
import { menuMessage } from './message';

export async function menuAction(ctx: Context) {
	return menuMessage(ctx);
}

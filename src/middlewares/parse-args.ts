import { Context } from 'telegraf';
import { parseArgs } from '../utils';

export async function parseArgsMiddleware(ctx: Context, next: Function) {
	try {
		const args = parseArgs(ctx);
		ctx.args = args || [];
		return next();
	} catch (error) {
		console.error(error);
	}
	next();
}

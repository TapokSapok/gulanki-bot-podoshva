import { Context } from 'telegraf';

export function parseArgs(ctx: Context<any>) {
	return ctx?.update?.callback_query?.data?.split(':')?.map((i: any) => {
		if (i === 'true') return true;
		else if (i === 'false') return false;
		else if (Number.isNaN(Number(i))) return i;
		else return Number(i);
	});
}

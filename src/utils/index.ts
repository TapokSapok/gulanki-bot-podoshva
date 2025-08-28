import dayjs from 'dayjs';
import { Context } from 'telegraf';
import { WizardContext } from 'telegraf/typings/scenes';

export const errEmoji = '🚫';
export const BACK_TEXT = '‹ Назад';

export const cancelButton = [{ text: '× Отменить', callback_data: 'CANCEL_WIZARD' }];

export function formatDate(date: Date) {
	return dayjs(date).format(`D MMMM, HH:mm`);
}

export function parseArgs(ctx: Context<any> | WizardContext) {
	if (!ctx?.update?.callback_query?.data) return [];
	return ctx?.update?.callback_query?.data?.split(':')?.map((i: any) => {
		if (i === 'true') return true;
		else if (i === 'false') return false;
		else if (Number.isNaN(Number(i))) return i;
		else return Number(i);
	});
}

export function chunkArray<T>(arr: T[], size: number): T[][] {
	if (size <= 0) throw new Error('Size must be greater than 0');
	const result: T[][] = [];
	for (let i = 0; i < arr.length; i += size) {
		result.push(arr.slice(i, i + size));
	}
	return result;
}

export function isValidDateFormat(input: string) {
	const regex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])$/;
	return regex.test(input);
}

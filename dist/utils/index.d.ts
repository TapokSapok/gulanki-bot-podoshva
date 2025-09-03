import { Context } from 'telegraf';
import { WizardContext } from 'telegraf/typings/scenes';
export declare const errEmoji = "\uD83D\uDEAB";
export declare const BACK_TEXT = "\u2039 \u041D\u0430\u0437\u0430\u0434";
export declare const cancelButton: {
    text: string;
    callback_data: string;
}[];
export declare function formatDate(date: Date): string;
export declare function parseArgs(ctx: Context<any> | WizardContext): any;
export declare function chunkArray<T>(arr: T[], size: number): T[][];
export declare function isValidDateFormat(input: string): boolean;

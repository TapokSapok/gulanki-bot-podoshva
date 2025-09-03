import { Context } from 'telegraf';
export declare function approveEventAction(ctx: Context): Promise<true>;
export declare function rejectEventAction(ctx: Context): Promise<true>;
export declare function eventRequestAction(ctx: Context): Promise<true | import("@telegraf/types").Message.TextMessage>;
export declare function eventRequestAnswerAction(ctx: Context): Promise<true | import("@telegraf/types").Message.TextMessage>;

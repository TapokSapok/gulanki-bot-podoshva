import { Context } from 'telegraf';
export declare function myProfileAction(ctx: Context): Promise<import("@telegraf/types").Message.TextMessage>;
export declare function requestCheckProfileAction(ctx: Context): Promise<true | (import("@telegraf/types").Message.DocumentMessage | import("@telegraf/types").Message.AudioMessage | import("@telegraf/types").Message.PhotoMessage | import("@telegraf/types").Message.VideoMessage)[]>;

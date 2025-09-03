import { Context } from 'telegraf';
export declare function menuAction(ctx: Context, isReply?: boolean): Promise<true | import("@telegraf/types").Message.TextMessage | (import("@telegraf/types").Message.DocumentMessage | import("@telegraf/types").Message.AudioMessage | import("@telegraf/types").Message.PhotoMessage | import("@telegraf/types").Message.VideoMessage)[] | undefined>;

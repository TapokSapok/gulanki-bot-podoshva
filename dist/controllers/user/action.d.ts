import { Context } from 'telegraf';
export declare function unbanUserAction(ctx: Context): Promise<true | import("@telegraf/types").Message.TextMessage | (import("@telegraf/types").Message.DocumentMessage | import("@telegraf/types").Message.AudioMessage | import("@telegraf/types").Message.PhotoMessage | import("@telegraf/types").Message.VideoMessage)[]>;
export declare function banUserEventAction(ctx: Context): Promise<true | import("@telegraf/types").Message.TextMessage>;

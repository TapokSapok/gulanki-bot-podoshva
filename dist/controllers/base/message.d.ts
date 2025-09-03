import { Context } from 'telegraf';
import { ProfileType } from '../../db/schema/profile';
import { UserType } from '../../db/schema/user';
export declare function menuMessage(ctx: Context, isReply?: boolean): Promise<true | import("@telegraf/types").Message.TextMessage | (import("@telegraf/types").Update.Edited & import("@telegraf/types").Message.TextMessage)>;
export declare function moderateProfileText(profile: ProfileType, user: UserType): string;

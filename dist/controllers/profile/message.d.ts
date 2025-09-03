import { Context } from 'telegraf';
import { UserType } from '../../db/schema/user';
import { ProfileType } from '../../db/schema/profile';
export declare function profileText(profile: ProfileType, user: UserType): string;
export declare function myProfileMessage(ctx: Context, user: UserType, profile: ProfileType): Promise<import("@telegraf/types").Message.TextMessage>;

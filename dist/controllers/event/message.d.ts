import { EventType } from '../../db/schema/event';
import { ProfileType } from '../../db/schema/profile';
import { UserType } from '../../db/schema/user';
import { Context } from 'telegraf';
import { EventRequestType } from '../../db/schema/event-request';
export declare function eventModerateMessage(user: UserType, profile: ProfileType, event: EventType, ctx?: Context): Promise<true | import("@telegraf/types").Message.TextMessage>;
export declare function eventPublicMessage(user: UserType, profile: ProfileType, event: EventType, ctx?: Context, isReply?: boolean): Promise<true | (import("@telegraf/types").Message.DocumentMessage | import("@telegraf/types").Message.AudioMessage | import("@telegraf/types").Message.PhotoMessage | import("@telegraf/types").Message.VideoMessage)[] | (import("@telegraf/types").Update.Edited & import("@telegraf/types").Message.CaptionableMessage)>;
export declare function eventRequestText(event: EventType, profile: ProfileType, user: UserType, eventRequest?: EventRequestType, eventRequestUser?: UserType): string;

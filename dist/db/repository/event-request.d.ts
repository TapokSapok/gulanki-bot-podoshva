import { eventRequestT, EventRequestType } from '../schema/event-request';
import { ProfileType } from '../schema/profile';
import { UserType } from '../schema/user';
import { EventType } from '../schema/event';
export declare function createEventRequest(data: typeof eventRequestT.$inferInsert): Promise<{
    id: number;
    createdAt: Date;
    userId: number;
    profileId: number;
    isApproved: boolean;
    isRejected: boolean;
    eventId: number;
}>;
export declare function getEventRequest(userId: number, eventId: number): Promise<{
    user: UserType | null;
    profile: ProfileType | null;
    event: EventType | null;
    eventRequest: EventRequestType | null;
} | undefined>;
export declare function updateEventRequest(id: number, data: Partial<EventRequestType>): Promise<{
    id: number;
    profileId: number;
    userId: number;
    eventId: number;
    isApproved: boolean;
    isRejected: boolean;
    createdAt: Date;
}>;

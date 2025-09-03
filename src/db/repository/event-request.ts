import { and, eq } from 'drizzle-orm';
import db from '../db';
import { eventRequestT, EventRequestType } from '../schema/event-request';
import { profileT, ProfileType } from '../schema/profile';
import { userT, UserType } from '../schema/user';
import { eventT, EventType } from '../schema/event';

export async function createEventRequest(data: typeof eventRequestT.$inferInsert) {
	const [res] = await db.insert(eventRequestT).values(data).returning();
	return res;
}

export async function getEventRequest(
	userId: number,
	eventId: number
): Promise<{ user: UserType | null; profile: ProfileType | null; event: EventType | null; eventRequest: EventRequestType | null } | undefined> {
	const [res] = await db
		.select({ eventRequest: eventRequestT, user: userT, profile: profileT, event: eventT })
		.from(eventRequestT)
		.leftJoin(userT, eq(eventRequestT.userId, userT.id))
		.leftJoin(profileT, eq(eventRequestT.profileId, profileT.id))
		.leftJoin(eventT, eq(eventRequestT.eventId, eventT.id))
		.where(and(eq(eventRequestT.userId, userId), eq(eventRequestT.eventId, eventId)));
	return res;
}

export async function updateEventRequest(id: number, data: Partial<EventRequestType>) {
	const [res] = await db.update(eventRequestT).set(data).where(eq(eventRequestT.id, id)).returning();
	return res;
}

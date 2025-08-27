import { eq } from 'drizzle-orm';
import db from '../db';
import { eventT, EventType } from '../schema/event';
import { userT } from '../schema/user';
import { profileT } from '../schema/profile';

export async function createEvent(data: typeof eventT.$inferInsert) {
	const [res] = await db.insert(eventT).values(data).returning();
	return res;
}

export async function getEventById(id: number) {
	const [res] = await db
		.select({ event: eventT, user: userT, profile: profileT })
		.from(eventT)
		.leftJoin(userT, eq(eventT.userId, userT.id))
		.leftJoin(profileT, eq(eventT.profileId, profileT.id))
		.where(eq(eventT.id, id));
	return res;
}

export async function updateEvent(id: number, data: Partial<EventType>) {
	const [res] = await db.update(eventT).set(data).where(eq(eventT.id, id)).returning();
	return res;
}

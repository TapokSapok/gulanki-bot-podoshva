import { eq } from 'drizzle-orm';
import db from '../db';
import { profileT, ProfileType } from '../schema/profile';

export async function createProfile(data: typeof profileT.$inferInsert) {
	const [result] = await db.insert(profileT).values(data).returning();
	return result;
}

export async function updateProfile(id: number, data: Partial<ProfileType>) {
	const [result] = await db.update(profileT).set(data).where(eq(profileT.id, id)).returning();
	return result;
}

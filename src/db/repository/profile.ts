import db from '../db';
import { profileT } from '../schema/profile';

export async function createProfile(data: typeof profileT.$inferInsert) {
	const [result] = await db.insert(profileT).values(data).returning();
	return result;
}

import { eq } from 'drizzle-orm';
import db from '../db';
import { profileT } from '../schema/profile';
import { userT, UserType } from '../schema/user';

export async function getUserByTgIdWithProfile(tgId: number): Promise<{
	user: typeof userT.$inferSelect | null;
	profile: typeof profileT.$inferSelect | null;
}> {
	const [result] = await db
		.select({
			user: userT,
			profile: profileT,
		})
		.from(userT)
		.leftJoin(profileT, eq(userT.id, profileT.userId))
		.where(eq(userT.tg_id, tgId));

	return {
		user: result?.user ?? null,
		profile: result?.profile ?? null,
	};
}

export async function getUserByTgId(tgId: number) {
	const [result] = await db.select().from(userT).where(eq(userT.tg_id, tgId));
	return result;
}

export async function createUser(data: typeof userT.$inferInsert) {
	const [result] = await db.insert(userT).values(data).returning();
	return result;
}

export async function updateUser(id: number, data: Partial<UserType>) {
	const [result] = await db.update(userT).set(data).where(eq(userT.id, id)).returning();
	return result;
}

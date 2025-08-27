import * as t from 'drizzle-orm/pg-core';
import { userT } from './user';
import { sql } from 'drizzle-orm';

export const profileT = t.pgTable('profile', {
	id: t.integer().primaryKey().generatedAlwaysAsIdentity(),

	userId: t
		.integer('user_id')
		.notNull()
		.unique()
		.references(() => userT.id),

	name: t.varchar({ length: 16 }).notNull(),
	age: t.integer().notNull(),
	photo: t
		.text()
		.array()
		.notNull()
		.default(sql`array[]::text[]`),
	city: t.varchar({ length: 32 }).notNull(),
	aboutMe: t.varchar('about_me', { length: 256 }),

	createdAt: t
		.timestamp('created_at')
		.notNull()
		.$defaultFn(() => new Date()),
});

export type ProfileType = typeof profileT.$inferSelect;

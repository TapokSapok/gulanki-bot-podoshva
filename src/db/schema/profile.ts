import * as t from 'drizzle-orm/pg-core';
import { userT } from './user';

export const profileT = t.pgTable('profile', {
	id: t.integer().primaryKey().generatedAlwaysAsIdentity(),

	userTgId: t
		.integer('user_tg_id')
		.notNull()
		.unique()
		.references(() => userT.tg_id),

	name: t.varchar({ length: 32 }).notNull(),
	age: t.integer().notNull(),
	photo: t.varchar({ length: 256 }).notNull(),
	city: t.varchar({ length: 32 }).notNull(),
	aboutMe: t.varchar('about_me', { length: 256 }),

	createdAt: t
		.time('created_at')
		.notNull()
		.$defaultFn(() => new Date().toISOString()),
});

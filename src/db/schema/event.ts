import * as t from 'drizzle-orm/pg-core';
import { profileT } from './profile';
import { userT } from './user';

export const eventT = t.pgTable('event', {
	id: t.integer().primaryKey().generatedAlwaysAsIdentity(),

	profileId: t
		.integer()
		.notNull()
		.references(() => profileT.id),
	userId: t
		.integer()
		.notNull()
		.references(() => userT.id),

	publicChannelId: t.bigint({ mode: 'number' }).notNull(),
	moderateChannelId: t.bigint({ mode: 'number' }).notNull(),

	isApproved: t.boolean().notNull().default(false),
	isRejected: t.boolean().notNull().default(false),

	isUsernameHide: t.boolean().notNull(),
	isPhotoHide: t.boolean().notNull(),

	description: t.varchar({ length: 256 }).notNull(),
	eventDate: t.timestamp().notNull(),

	createdAt: t
		.timestamp('created_at')
		.notNull()
		.$defaultFn(() => new Date()),
});

export type EventType = typeof eventT.$inferSelect;

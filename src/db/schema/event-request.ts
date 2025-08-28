import * as t from 'drizzle-orm/pg-core';
import { profileT } from './profile';
import { userT } from './user';
import { eventT } from './event';

export const eventRequestT = t.pgTable('event_request', {
	id: t.integer().primaryKey().generatedAlwaysAsIdentity(),

	profileId: t
		.integer()
		.notNull()
		.references(() => profileT.id),
	userId: t
		.integer()
		.notNull()
		.references(() => userT.id),
	eventId: t
		.integer()
		.notNull()
		.references(() => eventT.id),

	isApproved: t.boolean().notNull().default(false),
	isRejected: t.boolean().notNull().default(false),

	createdAt: t
		.timestamp('created_at')
		.notNull()
		.$defaultFn(() => new Date()),
});

export type EventRequestType = typeof eventRequestT.$inferSelect;

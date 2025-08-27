import * as t from 'drizzle-orm/pg-core';

export const cityT = t.pgTable('city', {
	id: t.integer().primaryKey().generatedAlwaysAsIdentity(),

	name: t.varchar({ length: 32 }).notNull().unique(),
	publicChannelId: t.bigint({ mode: 'number' }).notNull(),
	moderateChannelId: t.bigint({ mode: 'number' }).notNull(),

	createdAt: t
		.timestamp('created_at')
		.notNull()
		.$defaultFn(() => new Date()),
});

export type CityType = typeof cityT.$inferSelect;

import * as t from 'drizzle-orm/pg-core';

export enum Role {
	Admin = 'admin',
	Default = 'default',
}

export const userT = t.pgTable('user', {
	id: t.integer().primaryKey().generatedAlwaysAsIdentity(),

	tg_id: t.bigint({ mode: 'number' }).unique().notNull(),
	username: t.varchar({ length: 32 }).unique(),
	firstName: t.varchar('first_name', { length: 64 }),
	karma: t.integer().notNull().default(0),
	role: t.varchar({ length: 32 }).$type<Role>().default(Role.Default).notNull(),
	isBanned: t.boolean().notNull().default(false),

	createdAt: t
		.timestamp('created_at')
		.notNull()
		.$defaultFn(() => new Date()),
});

export type UserType = typeof userT.$inferSelect;

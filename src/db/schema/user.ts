import * as t from 'drizzle-orm/pg-core';

export enum Role {
	Admin = 'admin',
	Default = 'default',
}

export const roleEnum = t.pgEnum('role', [Role.Admin, Role.Default]);

export const userT = t.pgTable('user', {
	_id: t.integer().primaryKey().generatedAlwaysAsIdentity(),

	tg_id: t.integer().unique().notNull(),
	username: t.varchar({ length: 32 }).unique(),
	firstName: t.varchar('first_name', { length: 64 }),
	karma: t.integer().notNull().default(0),
	role: roleEnum().default(Role.Default).notNull(),

	createdAt: t
		.time('created_at')
		.notNull()
		.$defaultFn(() => new Date().toISOString()),
});

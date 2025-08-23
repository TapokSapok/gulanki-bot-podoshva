import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/db/schema/',
	out: './drizzle',
	dialect: 'postgresql',
	dbCredentials: {
		database: process.env.DB_BASE as string,
		host: process.env.DB_HOST as string,
		port: Number(process.env.DB_PORT) as number,
		user: process.env.DB_USER as string,
		password: process.env.DB_PASSWORD as string,
		ssl: false,
	},
	verbose: true,
});

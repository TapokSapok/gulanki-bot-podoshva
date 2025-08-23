import 'dotenv/config';

export class Config {
	static bot = {
		token: process.env.BOT_TOKEN as string,
	};

	static db = {
		database: process.env.DB_BASE as string,
		host: process.env.DB_HOST as string,
		port: Number(process.env.DB_PORT) as number,
		username: process.env.DB_USER as string,
		password: process.env.DB_PASSWORD as string,
	};
}

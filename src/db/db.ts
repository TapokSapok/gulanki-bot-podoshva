import postgres from 'postgres';
import { Config } from '../config';
import { drizzle } from 'drizzle-orm/postgres-js';

export default drizzle(postgres(Config.db));

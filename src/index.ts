import dayjs from 'dayjs';
import './bot';
import db from './db/db';
import { profileT } from './db/schema/profile';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.locale('ru');
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

async function deleteAllProfiles() {
	const res = await db.delete(profileT).returning();
	console.log(res, 'DELETED');
}

async function main() {
	// deleteAllProfiles();
}
main();

process.on('uncaughtException', e => console.error('uncaughtException', e));
process.on('unhandledRejection', e => console.error('unhandledRejection', e));

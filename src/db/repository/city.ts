import { eq } from 'drizzle-orm';
import db from '../db';
import { cityT } from '../schema/city';

export async function createCity(cityName: string, publicChannelId: number, moderateChannelId: number) {
	const [res] = await db.insert(cityT).values({ name: cityName, publicChannelId, moderateChannelId }).returning();
	return res;
}

export async function removeCity(cityName: string) {
	const [res] = await db.delete(cityT).where(eq(cityT.name, cityName)).returning();
	return res;
}

export async function getCityById(id: number) {
	const [res] = await db.select().from(cityT).where(eq(cityT.id, id));
	return res;
}

export async function getCityByName(cityName: string) {
	const [res] = await db.select().from(cityT).where(eq(cityT.name, cityName));
	return res;
}

export async function getAllCities() {
	const res = await db.select().from(cityT);
	return res;
}

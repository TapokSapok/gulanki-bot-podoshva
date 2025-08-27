import { Context } from 'telegraf';
import { getAllCities } from '../../db/repository/city';
import { CityType } from '../../db/schema/city';

export async function addCityMessage(ctx: Context, addedCity: string) {
	return await ctx.reply(`✅ Город <b><i>${addedCity}</i></b> добавлен`, { parse_mode: 'HTML' });
}

export async function removeCityMessage(ctx: Context, removedCity: string) {
	return await ctx.reply(`✅ Город <b><i>${removedCity}</i></b> удалён`, { parse_mode: 'HTML' });
}

export async function citiesMessage(ctx: Context, cities: CityType[] = []) {
	return await ctx.reply(
		`🌎 Список городов:\n\n${cities
			.map(c => `Город: <code>${c.name}</code>\nКанал модерации: <code>${c.moderateChannelId}</code>\nПубличный канал: <code>${c.publicChannelId}</code>`)
			.join('\n\n')}`,
		{ parse_mode: 'HTML' }
	);
}

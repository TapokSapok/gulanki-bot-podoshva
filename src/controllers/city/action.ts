import { Context } from 'telegraf';
import { addCityMessage, citiesMessage, removeCityMessage } from './message';
import { ValidateError } from '../../utils/errors';
import { createCity, getAllCities, getCityByName, removeCity } from '../../db/repository/city';

export async function addCityAction(ctx: Context) {
	let [cityName, publicChannelId, moderateChannelId] = ctx?.payload?.split(' ');
	publicChannelId = Number(publicChannelId);
	moderateChannelId = Number(moderateChannelId);

	if (!cityName || Number.isNaN(publicChannelId) || Number.isNaN(moderateChannelId)) {
		throw new ValidateError('Формат команды:\n/add_city <city> <public channel id> <moderate channel id>\n\n❗️ Пример команды:\n/add_city Москва -1002853462255 -1002853462255');
	}
	const existsCity = await getCityByName(cityName);
	if (existsCity) throw new ValidateError(`Город ${cityName} уже добавлен`);
	const city = await createCity(cityName, publicChannelId, moderateChannelId);
	return await addCityMessage(ctx, city.name);
}

export async function removeCityAction(ctx: Context) {
	const cityName = ctx?.payload?.split(' ')[0];
	if (!cityName) throw new ValidateError('Введите название города, который хотите удалить');
	const existsCity = await getCityByName(cityName);
	if (!existsCity) throw new ValidateError(`Города ${cityName} и так нет`);
	const city = await removeCity(cityName);
	return await removeCityMessage(ctx, city.name);
}

export async function citiesAction(ctx: Context) {
	const cities = await getAllCities();
	return await citiesMessage(ctx, cities);
}

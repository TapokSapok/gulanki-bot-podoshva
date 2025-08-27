import { bot } from '../../bot';
import asyncWrapper from '../../utils/async-wrapper';
import { addCityAction, citiesAction, removeCityAction } from './action';

bot.command(
	'add_city',
	asyncWrapper(async ctx => await addCityAction(ctx))
);

bot.command(
	'remove_city',
	asyncWrapper(async ctx => await removeCityAction(ctx))
);

bot.command(
	'cities',
	asyncWrapper(async ctx => await citiesAction(ctx))
);

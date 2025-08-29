import { bot } from '../../bot';
import { checkAdminMiddleware } from '../../middlewares/check-admin-middleware';
import asyncWrapper from '../../utils/async-wrapper';
import { addCityAction, citiesAction, removeCityAction } from './action';

bot.command('add_city', asyncWrapper(checkAdminMiddleware), asyncWrapper(addCityAction));

bot.command('remove_city', asyncWrapper(checkAdminMiddleware), asyncWrapper(removeCityAction));

bot.command('cities', asyncWrapper(checkAdminMiddleware), asyncWrapper(citiesAction));

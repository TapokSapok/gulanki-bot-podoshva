import { Context } from 'telegraf';
import { bot } from '../../bot';
import asyncWrapper from '../../utils/async-wrapper';
import { menuAction } from './action';

bot.start(asyncWrapper(menuAction));

bot.action(/^menu/, asyncWrapper(menuAction));

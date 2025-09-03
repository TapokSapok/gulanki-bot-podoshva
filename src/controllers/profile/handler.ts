import { Context } from 'telegraf';
import { bot } from '../../bot';
import asyncWrapper from '../../utils/async-wrapper';
import { myProfileAction, requestCheckProfileAction } from './action';
import { Scene } from '../../types/enums';

bot.action(/^create_profile/, ctx => ctx.scene.enter(Scene.create_profile));

bot.action(/^my_profile/, asyncWrapper(myProfileAction));

bot.action(/^request_check_profile/, asyncWrapper(requestCheckProfileAction));

bot.action(/^edit_my_profile/, ctx => ctx.scene.enter(Scene.edit_my_profile, { args: ctx.args }));

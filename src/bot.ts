import { Scenes, session, Telegraf } from 'telegraf';
import { Config } from './config';
import { parseArgsMiddleware } from './middlewares/parse-args';

const bot = new Telegraf(Config.bot.token);

const stage = new Scenes.Stage<Scenes.SceneContext>([]);

bot.use(session());
bot.use(stage.middleware());
bot.use(parseArgsMiddleware);

bot.launch();

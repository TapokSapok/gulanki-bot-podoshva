import { Context } from 'telegraf';
import { FatalError, ValidateError } from './errors';
import { menuAction } from '../controllers/base/action';
import { WizardContext } from 'telegraf/typings/scenes';

function asyncWrapper<T extends Context>(fn: (ctx: T, next: () => Promise<void>) => Promise<any>) {
	return (ctx: T, next: () => Promise<void>) => {
		(async () => {
			return fn(ctx, next)?.catch(async e => {
				console.log(e);
				if (e instanceof ValidateError) {
					const errMsg = 'Ошибка валидации';
					await ctx.reply(e.message || errMsg);
					if (e.skip) {
						await ctx.scene.leave();
						await menuAction(ctx, true);
					}
				} else if (e instanceof FatalError) {
					const errMsg = 'Фатальная ошибка';
					await ctx.reply(e.message || errMsg);
					if (e.skip) {
						await ctx.scene.leave();
						await menuAction(ctx, true);
					}
				} else {
					const errMsg = 'Упс, произошла неизвестная ошибка';
					await ctx.scene.leave();

					if (ctx.updateType === 'callback_query') await ctx.answerCbQuery(errMsg, { cache_time: 5 });
					else await ctx.reply(errMsg);
				}

				if (e.withoutNext) return;
				else return next();
			});
		})();
	};
}
export default asyncWrapper;

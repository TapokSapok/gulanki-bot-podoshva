import { Context } from 'telegraf';
import { FatalError, ValidateError } from './error';
import { menuAction } from '../helpers';

function asyncWrapper(fn: Function) {
	return (ctx: Context, next: Function) => {
		(async () => {
			return fn(ctx, next)?.catch(async e => {
				console.log(e);
				if (e instanceof ValidateError) {
					const errMsg = 'Ошибка валидации';
					await ctx.reply(e.message || errMsg);
					if (e.skip) {
						await ctx.scene.leave();
						await menuAction(ctx);
					}
				} else if (e instanceof FatalError) {
					const errMsg = 'Фатальная ошибка';
					await ctx.reply(e.message || errMsg);
					if (e.skip) {
						await ctx.scene.leave();
						await menuAction(ctx);
					}
				} else {
					const errMsg = 'Упс, произошла неизвестная ошибка';
					await ctx.scene.leave();

					if (ctx.updateType === 'callback_query') await ctx.answerCbQuery(errMsg, { cache_time: 5 });
					else await ctx.reply(errMsg);
				}

				return next();
			});
		})();
	};
}
export default asyncWrapper;

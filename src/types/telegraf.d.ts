import 'telegraf';
import type { CallbackQuery } from 'telegraf/typings/core/types/typegram';
import type { Scenes } from 'telegraf';

declare module 'telegraf/session';
declare module 'telegraf/stage';
declare module 'telegraf/scenes/base';

declare module 'telegraf' {
	interface Context {
		scene: any & { state: any & { args: any } };
		args: (string | number | boolean)[];
		payload?: any;
	}
}

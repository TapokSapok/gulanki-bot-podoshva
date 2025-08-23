import 'telegraf';

declare module 'telegraf/session';
declare module 'telegraf/stage';
declare module 'telegraf/scenes/base';

declare module 'telegraf' {
	interface Context {
		// scene: any & { state: any & { args: any } };
		// session: SceneSession<SceneSessionData> & {
		// 	user?: typeof userTb.$inferSelect;
		// };
		args: (string | number | boolean)[];
	}
}

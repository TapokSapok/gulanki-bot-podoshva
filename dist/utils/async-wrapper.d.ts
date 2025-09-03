import { Context } from 'telegraf';
declare function asyncWrapper<T extends Context>(fn: (ctx: T, next: () => Promise<void>) => Promise<any>): (ctx: T, next: () => Promise<void>) => void;
export default asyncWrapper;

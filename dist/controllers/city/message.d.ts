import { Context } from 'telegraf';
import { CityType } from '../../db/schema/city';
export declare function addCityMessage(ctx: Context, addedCity: string): Promise<import("@telegraf/types").Message.TextMessage>;
export declare function removeCityMessage(ctx: Context, removedCity: string): Promise<import("@telegraf/types").Message.TextMessage>;
export declare function citiesMessage(ctx: Context, cities?: CityType[]): Promise<import("@telegraf/types").Message.TextMessage>;

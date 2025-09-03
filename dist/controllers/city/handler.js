"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bot_1 = require("../../bot");
var check_admin_middleware_1 = require("../../middlewares/check-admin-middleware");
var async_wrapper_1 = __importDefault(require("../../utils/async-wrapper"));
var action_1 = require("./action");
bot_1.bot.command('add_city', (0, async_wrapper_1.default)(check_admin_middleware_1.checkAdminMiddleware), (0, async_wrapper_1.default)(action_1.addCityAction));
bot_1.bot.command('remove_city', (0, async_wrapper_1.default)(check_admin_middleware_1.checkAdminMiddleware), (0, async_wrapper_1.default)(action_1.removeCityAction));
bot_1.bot.command('cities', (0, async_wrapper_1.default)(check_admin_middleware_1.checkAdminMiddleware), (0, async_wrapper_1.default)(action_1.citiesAction));

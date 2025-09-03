"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bot_1 = require("../../bot");
var async_wrapper_1 = __importDefault(require("../../utils/async-wrapper"));
var action_1 = require("./action");
var enums_1 = require("../../types/enums");
bot_1.bot.action(/^create_profile/, function (ctx) { return ctx.scene.enter(enums_1.Scene.create_profile); });
bot_1.bot.action(/^my_profile/, (0, async_wrapper_1.default)(action_1.myProfileAction));
bot_1.bot.action(/^request_check_profile/, (0, async_wrapper_1.default)(action_1.requestCheckProfileAction));
bot_1.bot.action(/^edit_my_profile/, function (ctx) { return ctx.scene.enter(enums_1.Scene.edit_my_profile, { args: ctx.args }); });

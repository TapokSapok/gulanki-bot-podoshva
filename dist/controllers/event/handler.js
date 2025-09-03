"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bot_1 = require("../../bot");
var check_moder_middleware_1 = require("../../middlewares/check-moder-middleware");
var enums_1 = require("../../types/enums");
var async_wrapper_1 = __importDefault(require("../../utils/async-wrapper"));
var action_1 = require("./action");
bot_1.bot.action(/^create_event/, function (ctx) { return ctx.scene.enter(enums_1.Scene.create_event); });
bot_1.bot.action(/^approve_event/, (0, async_wrapper_1.default)(check_moder_middleware_1.checkModerMiddleware), (0, async_wrapper_1.default)(action_1.approveEventAction));
bot_1.bot.action(/^reject_event/, (0, async_wrapper_1.default)(check_moder_middleware_1.checkModerMiddleware), (0, async_wrapper_1.default)(action_1.rejectEventAction));
bot_1.bot.action(/^event_request_answer/, (0, async_wrapper_1.default)(action_1.eventRequestAnswerAction));
bot_1.bot.action(/^event_request/, (0, async_wrapper_1.default)(action_1.eventRequestAction));

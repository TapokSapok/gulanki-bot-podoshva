"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bot_1 = require("../../bot");
var check_admin_middleware_1 = require("../../middlewares/check-admin-middleware");
var async_wrapper_1 = __importDefault(require("../../utils/async-wrapper"));
var action_1 = require("./action");
bot_1.bot.command(/^unban/, check_admin_middleware_1.checkAdminMiddleware, (0, async_wrapper_1.default)(action_1.unbanUserAction));
bot_1.bot.action(/^ban_user_event/, check_admin_middleware_1.checkAdminMiddleware, (0, async_wrapper_1.default)(action_1.banUserEventAction));

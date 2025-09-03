"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveEventAction = approveEventAction;
exports.rejectEventAction = rejectEventAction;
exports.eventRequestAction = eventRequestAction;
exports.eventRequestAnswerAction = eventRequestAnswerAction;
var event_1 = require("../../db/repository/event");
var utils_1 = require("../../utils");
var bot_1 = require("../../bot");
var message_1 = require("./message");
var event_request_1 = require("../../db/repository/event-request");
var user_1 = require("../../db/repository/user");
function approveEventAction(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, event, profile, user, message;
        var _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!ctx.callbackQuery) return [3, 2];
                    return [4, ctx.answerCbQuery()];
                case 1:
                    _e.sent();
                    _e.label = 2;
                case 2: return [4, (0, event_1.getEventById)(ctx.args[1])];
                case 3:
                    _a = _e.sent(), event = _a.event, profile = _a.profile, user = _a.user;
                    if (!(!event || !profile || !user)) return [3, 5];
                    return [4, ctx.answerCbQuery("".concat(utils_1.errEmoji, " \u0421\u043E\u0431\u044B\u0442\u0438\u0435/\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C/\u043F\u0440\u043E\u0444\u0438\u043B\u044C \u043D\u0435 \u043D\u0430\u0438\u0306\u0434\u0435\u043D\u044B"))];
                case 4: return [2, _e.sent()];
                case 5: return [4, (0, message_1.eventPublicMessage)(user, profile, event, ctx, true)];
                case 6:
                    message = _e.sent();
                    return [4, (0, event_1.updateEvent)(event.id, { isApproved: true, publicMessageId: (_b = message === null || message === void 0 ? void 0 : message[0]) === null || _b === void 0 ? void 0 : _b.message_id, publicChannelUsername: (_d = (_c = message === null || message === void 0 ? void 0 : message[0]) === null || _c === void 0 ? void 0 : _c.chat) === null || _d === void 0 ? void 0 : _d.username })];
                case 7:
                    event = _e.sent();
                    return [4, (0, message_1.eventModerateMessage)(user, profile, event, ctx)];
                case 8:
                    _e.sent();
                    return [4, bot_1.bot.telegram.sendMessage(user.tg_id, "\u2705 <a href=\"https://t.me/".concat(event.publicChannelUsername, "/").concat(event.publicMessageId, "\">\u0421\u043E\u0431\u044B\u0442\u0438\u0435 \u043E\u0434\u043E\u0431\u0440\u0435\u043D\u043E</a>"), {
                            parse_mode: 'HTML',
                        })];
                case 9:
                    _e.sent();
                    return [4, ctx.answerCbQuery('✅ Событие одобрено')];
                case 10: return [2, _e.sent()];
            }
        });
    });
}
function rejectEventAction(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, event, profile, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!ctx.callbackQuery) return [3, 2];
                    return [4, ctx.answerCbQuery()];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2: return [4, (0, event_1.getEventById)(ctx.args[1])];
                case 3:
                    _a = _b.sent(), event = _a.event, profile = _a.profile, user = _a.user;
                    if (!(!event || !profile || !user)) return [3, 5];
                    return [4, ctx.answerCbQuery("".concat(utils_1.errEmoji, " \u0421\u043E\u0431\u044B\u0442\u0438\u0435/\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C/\u043F\u0440\u043E\u0444\u0438\u043B\u044C \u043D\u0435 \u043D\u0430\u0438\u0306\u0434\u0435\u043D\u044B"))];
                case 4: return [2, _b.sent()];
                case 5: return [4, (0, event_1.updateEvent)(event.id, { isRejected: true })];
                case 6:
                    event = _b.sent();
                    return [4, (0, message_1.eventModerateMessage)(user, profile, event, ctx)];
                case 7:
                    _b.sent();
                    return [4, bot_1.bot.telegram.sendMessage(user.tg_id, "\u274C \u0421\u043E\u0431\u044B\u0442\u0438\u0435 \u043D\u0435 \u043F\u0440\u043E\u0448\u043B\u043E \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u044E.", {
                            parse_mode: 'HTML',
                        })];
                case 8:
                    _b.sent();
                    return [4, ctx.answerCbQuery('✅ Событие отклонено')];
                case 9: return [2, _b.sent()];
            }
        });
    });
}
function eventRequestAction(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, event, eventUser, _b, user, profile;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!ctx.callbackQuery) return [3, 2];
                    return [4, ctx.answerCbQuery()];
                case 1:
                    _c.sent();
                    _c.label = 2;
                case 2: return [4, (0, event_1.getEventById)(ctx.args[1])];
                case 3:
                    _a = _c.sent(), event = _a.event, eventUser = _a.user;
                    if (!(!event || !eventUser)) return [3, 5];
                    return [4, ctx.reply("".concat(utils_1.errEmoji, " \u0421\u043E\u0431\u044B\u0442\u0438\u0435 \u043D\u0435 \u043D\u0430\u0438\u0306\u0434\u0435\u043D\u043E"))];
                case 4: return [2, _c.sent()];
                case 5: return [4, (0, user_1.getUserByTgIdWithProfile)(ctx.from.id)];
                case 6:
                    _b = _c.sent(), user = _b.user, profile = _b.profile;
                    if (!(!user || !profile)) return [3, 8];
                    return [4, ctx.reply("".concat(utils_1.errEmoji, " \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C/\u043F\u0440\u043E\u0444\u0438\u043B\u044C \u043D\u0435 \u043D\u0430\u0438\u0306\u0434\u0435\u043D\u044B"))];
                case 7: return [2, _c.sent()];
                case 8: return [4, (0, event_request_1.createEventRequest)({ eventId: event.id, profileId: profile.id, userId: user.id })];
                case 9:
                    _c.sent();
                    return [4, ctx.telegram.sendMessage(eventUser.tg_id, (0, message_1.eventRequestText)(event, profile, user), {
                            parse_mode: 'HTML',
                            link_preview_options: { is_disabled: true },
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: '📰 Посмотреть профиль', callback_data: "request_check_profile:".concat(user.tg_id) }],
                                    [
                                        { text: '✅ Одобрить', callback_data: "event_request_answer:".concat(event.id, ":").concat(user.id, ":true") },
                                        { text: '❌ Отклонить', callback_data: "event_request_answer:".concat(event.id, ":").concat(user.id, ":false") },
                                    ],
                                ],
                            },
                        })];
                case 10:
                    _c.sent();
                    return [4, ctx.editMessageText("\u2705 \u0417\u0430\u043F\u0440\u043E\u0441 \u043D\u0430 <a href=\"https://t.me/".concat(event.publicChannelUsername, "/").concat(event.publicMessageId, "\">\u0441\u043E\u0431\u044B\u0442\u0438\u0435</a> \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D."), {
                            parse_mode: 'HTML',
                            link_preview_options: { is_disabled: true },
                        })];
                case 11: return [2, _c.sent()];
            }
        });
    });
}
function eventRequestAnswerAction(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _, eventId, userId, isApproved, evtReq, eventRequest, profile, user, event;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!ctx.callbackQuery) return [3, 2];
                    return [4, ctx.answerCbQuery()];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2:
                    _a = __read(ctx.args, 4), _ = _a[0], eventId = _a[1], userId = _a[2], isApproved = _a[3];
                    return [4, (0, event_request_1.getEventRequest)(userId, eventId)];
                case 3:
                    evtReq = _b.sent();
                    if (!!evtReq) return [3, 5];
                    return [4, ctx.reply("".concat(utils_1.errEmoji, " \u0417\u0430\u043F\u0440\u043E\u0441 \u043D\u0435 \u043D\u0430\u0438\u0306\u0434\u0435\u043D"))];
                case 4: return [2, _b.sent()];
                case 5:
                    eventRequest = evtReq.eventRequest, profile = evtReq.profile, user = evtReq.user;
                    if (!(!eventRequest || !profile || !user)) return [3, 7];
                    return [4, ctx.reply("".concat(utils_1.errEmoji, " \u0421\u043E\u0431\u044B\u0442\u0438\u0435/\u0437\u0430\u043F\u0440\u043E\u0441/\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C/\u043F\u0440\u043E\u0444\u0438\u043B\u044C \u043D\u0435 \u043D\u0430\u0438\u0306\u0434\u0435\u043D\u044B"))];
                case 6: return [2, _b.sent()];
                case 7: return [4, (0, event_1.getEventById)(eventRequest.eventId)];
                case 8:
                    event = _b.sent();
                    if (!(!event.event || !event.user)) return [3, 10];
                    return [4, ctx.reply("".concat(utils_1.errEmoji, " \u0421\u043E\u0431\u044B\u0442\u0438\u0435/\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0438\u0306\u0434\u0435\u043D\u044B"))];
                case 9: return [2, _b.sent()];
                case 10:
                    if (!isApproved) return [3, 14];
                    return [4, (0, event_request_1.updateEventRequest)(eventRequest.id, { isApproved: true })];
                case 11:
                    eventRequest = _b.sent();
                    return [4, (0, event_1.updateEvent)(event.event.id, { responses: event.event.responses + 1 })];
                case 12:
                    _b.sent();
                    return [4, ctx.telegram.sendMessage(user.tg_id, "\u2705 \u0412\u0430\u0448 \u0437\u0430\u043F\u0440\u043E\u0441 \u043D\u0430 <a href=\"https://t.me/".concat(event.event.publicChannelUsername, "/").concat(event.event.publicMessageId, "\">c\u043E\u0431\u044B\u0442\u0438\u0435</a> \u043E\u0434\u043E\u0431\u0440\u0435\u043D!\n\n\uD83D\uDC64 \u0422\u0435\u0433: @").concat(event.user.username, "\n\u2139\uFE0F \u0422\u043E\u0447\u043D\u0430\u044F \u043B\u043E\u043A\u0430\u0446\u0438\u044F: ").concat(event.event.location ? event.event.location : "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u0430, \u0441\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 @".concat(event.user.username, " \u0434\u043B\u044F \u0443\u0442\u043E\u0447\u043D\u0435\u043D\u0438\u044F.")), { parse_mode: 'HTML', link_preview_options: { is_disabled: true } })];
                case 13:
                    _b.sent();
                    return [3, 17];
                case 14: return [4, (0, event_request_1.updateEventRequest)(eventRequest.id, { isRejected: true })];
                case 15:
                    eventRequest = _b.sent();
                    return [4, ctx.telegram.sendMessage(user.tg_id, "\u274C \u0412\u0430\u0448 \u0437\u0430\u043F\u0440\u043E\u0441 \u043D\u0430 <a href=\"https://t.me/".concat(event.event.publicChannelUsername, "/").concat(event.event.publicMessageId, "\">c\u043E\u0431\u044B\u0442\u0438\u0435</a> \u043E\u0442\u043A\u043B\u043E\u043D\u0435\u043D!"), { parse_mode: 'HTML', link_preview_options: { is_disabled: true } })];
                case 16:
                    _b.sent();
                    _b.label = 17;
                case 17: return [4, ctx.editMessageText((0, message_1.eventRequestText)(event.event, profile, user, eventRequest, user), {
                        parse_mode: 'HTML',
                        link_preview_options: { is_disabled: true },
                        reply_markup: {
                            inline_keyboard: [[{ text: '📰 Посмотреть профиль', callback_data: "request_check_profile:".concat(user.tg_id) }]],
                        },
                    })];
                case 18: return [2, _b.sent()];
            }
        });
    });
}

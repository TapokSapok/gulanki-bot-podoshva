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
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuAction = menuAction;
var message_1 = require("./message");
var event_1 = require("../../db/repository/event");
var utils_1 = require("../../utils");
var user_1 = require("../../db/repository/user");
var event_request_1 = require("../../db/repository/event-request");
function menuAction(ctx_1) {
    return __awaiter(this, arguments, void 0, function (ctx, isReply) {
        var _a, type, value, _b, event_2, profile, user, requestUser, evtReq, _c, user_2, profile_1, error_1;
        if (isReply === void 0) { isReply = false; }
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!ctx.callbackQuery) return [3, 2];
                    return [4, ctx.answerCbQuery()];
                case 1:
                    _d.sent();
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 21, , 22]);
                    _a = JSON.parse(atob(ctx.payload)), type = _a.type, value = _a.value;
                    if (!(type === 'event_request' && !Number.isNaN(value))) return [3, 15];
                    return [4, (0, event_1.getEventById)(value)];
                case 3:
                    _b = _d.sent(), event_2 = _b.event, profile = _b.profile, user = _b.user;
                    if (!(!event_2 || !profile || !user)) return [3, 5];
                    return [4, ctx.reply("".concat(utils_1.errEmoji, " \u0421\u043E\u0431\u044B\u0442\u0438\u0435/\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C/\u043F\u0440\u043E\u0444\u0438\u043B\u044C \u043D\u0435 \u043D\u0430\u0438\u0306\u0434\u0435\u043D\u044B"))];
                case 4:
                    _d.sent();
                    return [2, menuAction(ctx)];
                case 5: return [4, (0, user_1.getUserByTgId)(ctx.from.id)];
                case 6:
                    requestUser = _d.sent();
                    if (!!requestUser) return [3, 8];
                    return [4, ctx.reply("".concat(utils_1.errEmoji, " \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0438\u0306\u0434\u0435\u043D"))];
                case 7: return [2, _d.sent()];
                case 8:
                    if (!(requestUser.tg_id === user.tg_id)) return [3, 10];
                    return [4, ctx.reply("".concat(utils_1.errEmoji, " \u041D\u0435\u043B\u044C\u0437\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u043F\u0440\u043E\u0441 \u0441\u0430\u043C\u043E\u043C\u0443 \u0441\u0435\u0431\u0435"))];
                case 9: return [2, _d.sent()];
                case 10: return [4, (0, event_request_1.getEventRequest)(requestUser.id, event_2.id)];
                case 11:
                    evtReq = _d.sent();
                    console.log(evtReq);
                    if (!evtReq) return [3, 13];
                    return [4, ctx.reply("".concat(utils_1.errEmoji, " \u0412\u044B \u0443\u0436\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u043B\u0438 \u0437\u0430\u043F\u0440\u043E\u0441 \u043D\u0430 \u044D\u0442\u043E \u0441\u043E\u0431\u044B\u0442\u0438\u0435"))];
                case 12: return [2, _d.sent()];
                case 13: return [4, ctx.reply("\uD83D\uDCAB \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u043F\u0440\u043E\u0441 \u0441\u043E\u0437\u0434\u0430\u0442\u0435\u043B\u044E <a href=\"https://t.me/".concat(event_2.publicChannelUsername, "/").concat(event_2.publicMessageId, "\">\u0441\u043E\u0431\u044B\u0442\u0438\u044F</a>?\n\n<i>* \u041F\u043E\u0441\u043B\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u0432\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u0442\u0435\u043B\u0435\u0433\u0440\u0430\u043C \u0442\u0435\u0433 \u0438 \u043C\u0435\u0441\u0442\u043E \u0432\u0441\u0442\u0440\u0435\u0447\u0438.</i>"), {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: '✅ Да, отправить', callback_data: "event_request:".concat(event_2.id) },
                                    { text: '❌ Нет, передумал', callback_data: 'menu' },
                                ],
                            ],
                        },
                        link_preview_options: { is_disabled: true },
                    })];
                case 14: return [2, _d.sent()];
                case 15:
                    if (!(type === 'show_profile' && !Number.isNaN(value))) return [3, 20];
                    return [4, (0, user_1.getUserByTgIdWithProfile)(value)];
                case 16:
                    _c = _d.sent(), user_2 = _c.user, profile_1 = _c.profile;
                    if (!(!user_2 || !profile_1)) return [3, 18];
                    return [4, ctx.reply("".concat(utils_1.errEmoji, " \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C/\u043F\u0440\u043E\u0444\u0438\u043B\u044C \u043D\u0435 \u043D\u0430\u0438\u0306\u0434\u0435\u043D\u044B"))];
                case 17:
                    _d.sent();
                    return [2, menuAction(ctx)];
                case 18: return [4, ctx.sendMediaGroup(profile_1.photo.map(function (photo, index) { return ({
                        type: 'photo',
                        media: photo,
                        caption: index === 0 ? (0, message_1.moderateProfileText)(profile_1, user_2) : undefined,
                        parse_mode: 'HTML',
                    }); }))];
                case 19: return [2, _d.sent()];
                case 20: return [3, 22];
                case 21:
                    error_1 = _d.sent();
                    return [2, (0, message_1.menuMessage)(ctx, isReply)];
                case 22: return [2];
            }
        });
    });
}

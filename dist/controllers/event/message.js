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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventModerateMessage = eventModerateMessage;
exports.eventPublicMessage = eventPublicMessage;
exports.eventRequestText = eventRequestText;
var dayjs_1 = __importDefault(require("dayjs"));
var bot_1 = require("../../bot");
var utils_1 = require("../../utils");
function eventModerateMessage(user, profile, event, ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var text, extra;
        var _a;
        return __generator(this, function (_b) {
            text = "\uD83D\uDEE1 \u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430 \u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443  \u2335\n\n\uD83D\uDCA0 <a href=\"t.me/".concat((_a = bot_1.bot.botInfo) === null || _a === void 0 ? void 0 : _a.username, "?start=").concat(btoa(JSON.stringify({ type: 'show_profile', value: user.tg_id })), "\">\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C</a>: ").concat(user.username ? "@".concat(user.username) : "", " (<a href=\"tg://user?id=").concat(user.tg_id, "\">").concat(user.firstName, "</a>)\n\uD83D\uDC64 \u0418\u043C\u044F: ").concat(profile.name, "\n\uD83C\uDFEE \u0412\u043E\u0437\u0440\u0430\u0441\u0442: ").concat(profile.age, "\n\uD83C\uDF0D \u0413\u043E\u0440\u043E\u0434: ").concat(profile.city, "\n\uD83C\uDFD9 \u0420\u0430\u0439\u043E\u043D: ").concat(event.zone, "\n\u26E9 \u041B\u043E\u043A\u0430\u0446\u0438\u044F: ").concat(event.location ? event.location : '<i>Не указана</i>', "\n\n\u270D\uFE0F \u041E \u0441\u0435\u0431\u0435: ").concat(profile.aboutMe ? "<blockquote>".concat(profile.aboutMe, "</blockquote>") : '<i>Не указано</i>', "\n\n\uD83D\uDCCC \u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F: <blockquote>").concat(event.description, "</blockquote>\n\n\uD83D\uDCC5 \u0414\u0430\u0442\u0430 \u0441\u043E\u0431\u044B\u0442\u0438\u044F: ").concat((0, utils_1.formatDate)(event.eventDate), "\n\n\uD83E\uDE78 \u041A\u0430\u0440\u043C\u0430: ").concat(user.karma, "\n\u2139\uFE0F \u0410\u043A\u043A\u0430\u0443\u043D\u0442 \u0441\u043E\u0437\u0434\u0430\u043D: ").concat((0, utils_1.formatDate)(user.createdAt), " (").concat((0, dayjs_1.default)(user.createdAt).fromNow(), ")\n\n").concat(event.isApproved ? '✅ Событие одобрено' : event.isRejected ? '❌ Событие отклонено' : '', "\n").concat(user.isBanned ? '🚫 Пользователь заблокирован.' : '', "\n");
            extra = {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        !user.isBanned && !event.isApproved && !event.isRejected
                            ? [
                                { text: '✅ Одобрить', callback_data: "approve_event:".concat(event.id) },
                                { text: '❌ Отклонить', callback_data: "reject_event:".concat(event.id) },
                            ]
                            : [],
                        [
                            !user.isBanned
                                ? {
                                    text: '🚫 Забанить',
                                    callback_data: "ban_user_event:".concat(event.id),
                                }
                                : null,
                        ].filter(function (b) { return b; }),
                    ].filter(function (b) { return b; }),
                },
            };
            if (ctx === null || ctx === void 0 ? void 0 : ctx.callbackQuery) {
                return [2, ctx.editMessageText(text, extra)];
            }
            else {
                return [2, bot_1.bot.telegram.sendMessage(event.moderateChannelId, text, extra)];
            }
            return [2];
        });
    });
}
function eventPublicMessage(user_1, profile_1, event_1, ctx_1) {
    return __awaiter(this, arguments, void 0, function (user, profile, event, ctx, isReply) {
        var text;
        var _a;
        if (isReply === void 0) { isReply = false; }
        return __generator(this, function (_b) {
            text = "".concat(profile.name, ", ").concat(profile.age, ", ").concat(profile.city, "\n\t\n\u270D\uFE0F \u041E \u0441\u0435\u0431\u0435").concat(profile.aboutMe ? "  \u2335<blockquote>".concat(profile.aboutMe, "</blockquote>") : ' - <i>Не указано</i>', "\n\t\n\uD83D\uDCCC \u041E \u0441\u043E\u0431\u044B\u0442\u0438\u0438  \u2335<blockquote>").concat(event.description, "</blockquote>\n\n\uD83C\uDFD9 \u0420\u0430\u0439\u043E\u043D - ").concat(event.zone, "\n\uD83D\uDCC5 \u0414\u0430\u0442\u0430 \u0441\u043E\u0431\u044B\u0442\u0438\u044F - ").concat((0, utils_1.formatDate)(event.eventDate), "\n\uD83E\uDE78 \u041A\u0430\u0440\u043C\u0430 - ").concat(user.karma, "\n\n\uD83D\uDCAB <a href=\"https://t.me/").concat((_a = bot_1.bot.botInfo) === null || _a === void 0 ? void 0 : _a.username, "?start=").concat(btoa(JSON.stringify({ type: 'event_request', value: event.id })), "\">\u041E\u0442\u043A\u043B\u0438\u043A\u043D\u0443\u0442\u044C\u0441\u044F</a>\n");
            if ((ctx === null || ctx === void 0 ? void 0 : ctx.callbackQuery) && !isReply) {
                return [2, ctx.editMessageCaption(text, { parse_mode: 'HTML' })];
            }
            else {
                return [2, bot_1.bot.telegram.sendMediaGroup(event.publicChannelId, profile.photo.map(function (photo, index) { return ({
                        type: 'photo',
                        media: photo,
                        caption: index === 0 ? text : undefined,
                        parse_mode: 'HTML',
                    }); }))];
            }
            return [2];
        });
    });
}
function eventRequestText(event, profile, user, eventRequest, eventRequestUser) {
    console.log(eventRequest);
    return "\uD83D\uDCAB \u0412\u0430\u043C \u043F\u0440\u0438\u0448\u0435\u043B \u043E\u0442\u043A\u043B\u0438\u043A \u043D\u0430 <a href=\"https://t.me/".concat(event.publicChannelUsername, "/").concat(event.publicMessageId, "\">\u0441\u043E\u0431\u044B\u0442\u0438\u0435</a>.\n\n\uD83D\uDC64 ").concat(profile.name, ", ").concat(profile.age, ", ").concat(profile.city, "\n\uD83E\uDE78 \u041A\u0430\u0440\u043C\u0430 - ").concat(user.karma, "\n\n").concat((eventRequest === null || eventRequest === void 0 ? void 0 : eventRequest.isApproved) ? "\u2705 \u041E\u0434\u043E\u0431\u0440\u0435\u043D - @".concat(eventRequestUser === null || eventRequestUser === void 0 ? void 0 : eventRequestUser.username, "\n") : (eventRequest === null || eventRequest === void 0 ? void 0 : eventRequest.isRejected) ? '❌ Отклонен' : '').concat(!event.location && (eventRequest === null || eventRequest === void 0 ? void 0 : eventRequest.isApproved) ? "\n<i>* \u041B\u043E\u043A\u0430\u0446\u0438\u044F \u0441\u043E\u0431\u044B\u0442\u0438\u044F \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u0430, \u0441\u043E\u043E\u0431\u0449\u0438\u0442\u0435 \u0435\u0451 @".concat(eventRequestUser === null || eventRequestUser === void 0 ? void 0 : eventRequestUser.username, "</i>") : '');
}

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
exports.unbanUserAction = unbanUserAction;
exports.banUserEventAction = banUserEventAction;
var user_1 = require("../../db/repository/user");
var errors_1 = require("../../utils/errors");
var event_1 = require("../../db/repository/event");
var message_1 = require("../event/message");
var message_2 = require("../base/message");
function unbanUserAction(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var tgUserId, _a, user, profile;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!ctx.callbackQuery) return [3, 2];
                    return [4, ctx.answerCbQuery()];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2:
                    tgUserId = Number(ctx.args[0]);
                    if (Number.isNaN(tgUserId))
                        throw new errors_1.FatalError('Неверный формат, укажи tg_id пользователя');
                    return [4, (0, user_1.getUserByTgIdWithProfile)(tgUserId)];
                case 3:
                    _a = _b.sent(), user = _a.user, profile = _a.profile;
                    if (!(!user || !profile)) return [3, 5];
                    return [4, ctx.answerCbQuery('Пользователь/профиль не найдены')];
                case 4: return [2, _b.sent()];
                case 5:
                    if (!!user.isBanned) return [3, 7];
                    return [4, ctx.reply('Пользователь и так не заблокирован')];
                case 6: return [2, _b.sent()];
                case 7: return [4, (0, user_1.updateUser)(user.id, { isBanned: false })];
                case 8:
                    user = _b.sent();
                    return [4, ctx.sendMediaGroup(profile.photo.map(function (photo, index) { return ({
                            type: 'photo',
                            media: photo,
                            caption: index === 0 ? (0, message_2.moderateProfileText)(profile, user) + '\n\n✅ Пользователь разблокирован' : undefined,
                            parse_mode: 'HTML',
                        }); }))];
                case 9: return [2, _b.sent()];
            }
        });
    });
}
function banUserEventAction(ctx) {
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
                    if (!(!user || !profile || !event)) return [3, 5];
                    return [4, ctx.answerCbQuery('Пользователь/профиль/событие не найдены')];
                case 4: return [2, _b.sent()];
                case 5: return [4, (0, user_1.updateUser)(user.id, { isBanned: true })];
                case 6:
                    user = _b.sent();
                    return [4, (0, message_1.eventModerateMessage)(user, profile, event, ctx)];
                case 7: return [2, _b.sent()];
            }
        });
    });
}

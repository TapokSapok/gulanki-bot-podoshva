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
exports.default = authMiddleware;
var user_1 = require("../db/repository/user");
var errors_1 = require("../utils/errors");
function authMiddleware(ctx, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, user, profile, error_1;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!ctx.from)
                        return [2, next()];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 7, , 8]);
                    if (!ctx.from.username)
                        throw new errors_1.FatalError('Что бы пользоваться ботом, нужно указать телеграм тег!', true, true);
                    return [4, (0, user_1.getUserByTgIdWithProfile)(ctx.from.id)];
                case 2:
                    _a = _c.sent(), user = _a.user, profile = _a.profile;
                    if (!!user) return [3, 4];
                    return [4, (0, user_1.createUser)({ tg_id: ctx.from.id, username: ctx.from.username, firstName: ctx.from.first_name })];
                case 3:
                    user = _c.sent();
                    _c.label = 4;
                case 4:
                    if (user.isBanned) {
                    }
                    if (!!profile) return [3, 6];
                    if (((_b = ctx === null || ctx === void 0 ? void 0 : ctx.callbackQuery) === null || _b === void 0 ? void 0 : _b.data) === 'create_profile')
                        return [2, next()];
                    return [4, ctx.reply('У тебя нет профиля, нажми на кнопку для создания 👋', {
                            reply_markup: { inline_keyboard: [[{ text: '➕ Создать профиль', callback_data: 'create_profile' }]] },
                        })];
                case 5: return [2, _c.sent()];
                case 6:
                    next();
                    return [3, 8];
                case 7:
                    error_1 = _c.sent();
                    console.error(error_1);
                    return [3, 8];
                case 8: return [2];
            }
        });
    });
}

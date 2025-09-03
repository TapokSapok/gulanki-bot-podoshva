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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventScene = void 0;
var telegraf_1 = require("telegraf");
var enums_1 = require("../../../types/enums");
var async_wrapper_1 = __importDefault(require("../../../utils/async-wrapper"));
var utils_1 = require("../../../utils");
var action_1 = require("../../base/action");
var errors_1 = require("../../../utils/errors");
var event_1 = require("../../../db/repository/event");
var user_1 = require("../../../db/repository/user");
var city_1 = require("../../../db/repository/city");
var message_1 = require("../message");
var eventDays = [
    {
        text: 'Сегодня',
        callback_data: 'select_date:0',
    },
    {
        text: 'Завтра',
        callback_data: 'select_date:1',
    },
    {
        text: 'Послезавтра',
        callback_data: 'select_date:2',
    },
];
var messages = {
    typeEventDescription: function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2, ctx.reply('📌 Укажи информацию о встрече:\n\n<i>* Чем вы будете заниматься, цель встречи.</i>', { parse_mode: 'HTML', reply_markup: { inline_keyboard: [utils_1.cancelButton] } })];
    }); }); },
    typeZone: function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2, ctx.reply('ℹ️ Укажи район города, в котором будет проходить встреча', { parse_mode: 'HTML', reply_markup: { inline_keyboard: [utils_1.cancelButton] } })];
    }); }); },
    typeLocation: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, ctx.reply('ℹ️ Укажи точную локацию, в котором будет проходить встреча\n\n<i>* Вы можете пропустить и написать лично в лс тому, кто откликнется на вашу заявку.</i>', {
                    parse_mode: 'HTML',
                    reply_markup: { inline_keyboard: [[{ text: 'Пропустить', callback_data: 'skip' }], utils_1.cancelButton] },
                })];
        });
    }); },
    selectEventDate: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, ctx.reply('🌠 Выбери или напиши сам дату встречи:\n\n<i>* Пример: 22.02</i>', {
                    parse_mode: 'HTML',
                    reply_markup: { inline_keyboard: __spreadArray(__spreadArray([], __read((0, utils_1.chunkArray)(eventDays, 2)), false), [utils_1.cancelButton], false) },
                })];
        });
    }); },
    selectEventTime: function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2, ctx.reply('🕰 Укажи время встречи:\n\n<i>* Пример: 17:50</i>', { parse_mode: 'HTML', reply_markup: { inline_keyboard: [utils_1.cancelButton] } })];
    }); }); },
    eventCreated: function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2, ctx.reply('✅ Событие создано и отправлено на модерацию!')];
    }); }); },
};
exports.createEventScene = new telegraf_1.Scenes.WizardScene(enums_1.Scene.create_event, (0, async_wrapper_1.default)(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var user, eventExists;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!ctx.callbackQuery) return [3, 2];
                return [4, ctx.answerCbQuery()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [4, (0, user_1.getUserByTgId)(ctx.from.id)];
            case 3:
                user = _a.sent();
                if (!user)
                    throw new errors_1.FatalError('Пользователь не найден', true, true);
                return [4, (0, event_1.getEventByUserIdWithNotModerated)(user.id)];
            case 4:
                eventExists = _a.sent();
                if (!eventExists) return [3, 6];
                return [4, ctx.reply("".concat(utils_1.errEmoji, " \u0423 \u0432\u0430\u0441 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C \u0441\u043E\u0431\u044B\u0442\u0438\u0435 \u043D\u0430 \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u0438"))];
            case 5:
                _a.sent();
                return [2, (0, action_1.menuAction)(ctx, true)];
            case 6: return [4, messages.typeEventDescription(ctx)];
            case 7:
                _a.sent();
                return [2, ctx.wizard.next()];
        }
    });
}); }), (0, async_wrapper_1.default)(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var desc;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                desc = (_a = ctx.text) === null || _a === void 0 ? void 0 : _a.trim();
                if (!desc)
                    throw new errors_1.ValidateError('Введите информацию о встрече');
                else if (desc.length < 5)
                    throw new errors_1.ValidateError('Минимально 5 символов');
                else if (desc.length > 256)
                    throw new errors_1.ValidateError('Максимально 256 символов');
                ctx.scene.state.description = desc;
                return [4, messages.typeZone(ctx)];
            case 1:
                _b.sent();
                return [2, ctx.wizard.next()];
        }
    });
}); }), (0, async_wrapper_1.default)(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var text;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                text = (_a = ctx.text) === null || _a === void 0 ? void 0 : _a.trim();
                if (!text)
                    throw new errors_1.ValidateError('Укажи район города, в котором будет проходить встреча');
                else if (text.length < 2)
                    throw new errors_1.ValidateError('Минимально 2 символа');
                else if (text.length > 16)
                    throw new errors_1.ValidateError('Максимально 16 символов');
                ctx.scene.state.zone = text;
                return [4, messages.typeLocation(ctx)];
            case 1:
                _b.sent();
                return [2, ctx.wizard.next()];
        }
    });
}); }), (0, async_wrapper_1.default)(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var text, callbackData;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!ctx.callbackQuery) return [3, 2];
                return [4, ctx.answerCbQuery()];
            case 1:
                _c.sent();
                _c.label = 2;
            case 2:
                text = (_a = ctx.text) === null || _a === void 0 ? void 0 : _a.trim();
                callbackData = (_b = ctx === null || ctx === void 0 ? void 0 : ctx.callbackQuery) === null || _b === void 0 ? void 0 : _b.data;
                if (!text && callbackData !== 'skip')
                    throw new errors_1.ValidateError('Укажи точное место, в котором будет проходить встреча или пропусти');
                else if (!callbackData && text && text.length < 2)
                    throw new errors_1.ValidateError('Минимально 2 символа');
                else if (!callbackData && text && text.length > 32)
                    throw new errors_1.ValidateError('Максимально 32 символа');
                ctx.scene.state.location = callbackData === 'skip' ? null : text;
                return [4, messages.selectEventDate(ctx)];
            case 3:
                _c.sent();
                return [2, ctx.wizard.next()];
        }
    });
}); }), (0, async_wrapper_1.default)(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var text, _a, _, plusDay, date, _b, day, month;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!ctx.callbackQuery) return [3, 2];
                return [4, ctx.answerCbQuery()];
            case 1:
                _d.sent();
                _d.label = 2;
            case 2:
                text = ((_c = ctx.text) === null || _c === void 0 ? void 0 : _c.trim()) || '';
                _a = __read((0, utils_1.parseArgs)(ctx), 2), _ = _a[0], plusDay = _a[1];
                date = null;
                if (plusDay || plusDay === 0) {
                    date = new Date();
                    date.setDate(date.getDate() + plusDay);
                }
                else {
                    if (!(0, utils_1.isValidDateFormat)(text))
                        throw new errors_1.ValidateError('Неверный формат даты');
                    _b = __read(text.split('.').map(Number), 2), day = _b[0], month = _b[1];
                    if (!day || !month)
                        throw new errors_1.ValidateError('Неверный формат даты');
                    date = new Date();
                    date = new Date(date.getFullYear(), Math.floor(month) - 1, Math.floor(day));
                    if (date.getTime() < Date.now())
                        throw new errors_1.ValidateError('Дата не может быть в прошлом');
                }
                ctx.scene.state.date = date;
                return [4, messages.selectEventTime(ctx)];
            case 3:
                _d.sent();
                return [2, ctx.wizard.next()];
        }
    });
}); }), (0, async_wrapper_1.default)(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var text, _a, hour, minute, date, _b, user, profile, city, event;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!ctx.callbackQuery) return [3, 2];
                return [4, ctx.answerCbQuery()];
            case 1:
                _d.sent();
                _d.label = 2;
            case 2:
                text = (_c = ctx.text) === null || _c === void 0 ? void 0 : _c.trim();
                if (!text)
                    throw new errors_1.ValidateError('Неверный формат времени');
                _a = __read(text.split(':').map(Number), 2), hour = _a[0], minute = _a[1];
                if ((!hour && hour !== 0) || (!minute && minute !== 0))
                    throw new errors_1.ValidateError('Неверный формат времени');
                else if (hour < 0 || hour > 23)
                    throw new errors_1.ValidateError('Неверный формат времени');
                else if (minute < 0 || minute > 59)
                    throw new errors_1.ValidateError('Неверный формат времени');
                date = ctx.scene.state.date;
                date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0, 0);
                if (date.getTime() < new Date().getTime())
                    throw new errors_1.ValidateError('Дата не может быть в прошлом');
                ctx.scene.state.date = date;
                return [4, (0, user_1.getUserByTgIdWithProfile)(ctx.from.id)];
            case 3:
                _b = _d.sent(), user = _b.user, profile = _b.profile;
                if (!user || !profile)
                    throw new errors_1.FatalError('Пользователь или профиль не найдены', true, true);
                return [4, (0, city_1.getCityByName)(profile.city)];
            case 4:
                city = _d.sent();
                if (!city)
                    throw new errors_1.FatalError('Город не найден', true, true);
                return [4, (0, event_1.createEvent)({
                        description: ctx.scene.state.description,
                        eventDate: ctx.scene.state.date,
                        userId: user.id,
                        profileId: profile.id,
                        zone: ctx.scene.state.zone,
                        location: ctx.scene.state.location,
                        publicChannelId: city.publicChannelId,
                        moderateChannelId: city.moderateChannelId,
                    })];
            case 5:
                event = _d.sent();
                if (!event)
                    throw new errors_1.FatalError('Событие не создано', true, true);
                return [4, (0, message_1.eventModerateMessage)(user, profile, event)];
            case 6:
                _d.sent();
                console.log(event);
                return [4, messages.eventCreated(ctx)];
            case 7:
                _d.sent();
                return [4, (0, action_1.menuAction)(ctx, true)];
            case 8:
                _d.sent();
                return [2, ctx.scene.leave()];
        }
    });
}); }));

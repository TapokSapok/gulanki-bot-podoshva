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
exports.editMyProfileScene = exports.cancelButton = void 0;
var telegraf_1 = require("telegraf");
var enums_1 = require("../../../types/enums");
var async_wrapper_1 = __importDefault(require("../../../utils/async-wrapper"));
var utils_1 = require("../../../utils");
var city_1 = require("../../../db/repository/city");
var errors_1 = require("../../../utils/errors");
var profile_1 = require("../../../db/repository/profile");
var action_1 = require("../action");
var user_1 = require("../../../db/repository/user");
exports.cancelButton = [{ text: '× Отменить', callback_data: 'CANCEL_WIZARD:my_profile' }];
var messages = {
    typeName: function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2, ctx[ctx.callbackQuery ? 'editMessageText' : 'reply']('👤 Введите ваше имя:', { reply_markup: { inline_keyboard: [exports.cancelButton] } })];
    }); }); },
    typeAge: function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2, ctx[ctx.callbackQuery ? 'editMessageText' : 'reply']('🏮 Введите ваш возраст:', { reply_markup: { inline_keyboard: [exports.cancelButton] } })];
    }); }); },
    selectCity: function (ctx, cities) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, ctx[ctx.callbackQuery ? 'editMessageText' : 'reply']('🌏 Выберите свой город:', {
                    reply_markup: {
                        inline_keyboard: __spreadArray(__spreadArray([], __read((0, utils_1.chunkArray)(cities.map(function (city) { return ({ text: city.name, callback_data: "select_city:".concat(city.id) }); }), 2)), false), [
                            exports.cancelButton,
                        ], false),
                    },
                })];
        });
    }); },
    changePhotos: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, ctx[ctx.callbackQuery ? 'editMessageText' : 'reply']('📸 Отправь новые фотки\n\n<i>* До 3-х штук. В формате фото, не документа</i>', {
                    parse_mode: 'HTML',
                    reply_markup: { inline_keyboard: [exports.cancelButton] },
                })];
        });
    }); },
    selectedPhotos: function (ctx, photos) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, ctx.sendMediaGroup(photos.map(function (p, i) {
                    return { type: 'photo', media: p, caption: i === 0 ? '🗃 Ваши выбранные фото' : undefined };
                }))];
        });
    }); },
    selectPhotoAction: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, ctx.reply('Выберите действие 👇', {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: '✅ Сохранить выбранные фото', callback_data: 'end_photos' },
                                { text: '✏️ Выбрать другие фото', callback_data: 'change_photos' },
                            ],
                            exports.cancelButton,
                        ],
                    },
                })];
        });
    }); },
    aboutMe: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, ctx[ctx.callbackQuery ? 'editMessageText' : 'reply']('✍️ Расскажи о себе\n\n<i>* Максимум 256 символов</i>', {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [[{ text: 'Пропустить', callback_data: 'skip' }], exports.cancelButton],
                    },
                })];
        });
    }); },
    quantityCanSend: function (ctx, photosLength) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, ctx.reply("\u2795 \u0422\u044B \u043C\u043E\u0436\u0435\u0448\u044C \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0435\u0449\u0435 ".concat(3 - photosLength, " \u0444\u043E\u0442\u043E."), {
                    reply_markup: { inline_keyboard: [[{ text: 'Сохранить выбранные фото', callback_data: 'end_photos:true' }], exports.cancelButton] },
                })];
        });
    }); },
    tooManyPhotos: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, ctx.reply('🐤 Вы отправили слишком много фото. Сохранить первые 3?', {
                    reply_markup: { inline_keyboard: [[{ text: 'Сохранить выбранные фото', callback_data: 'end_photos' }], exports.cancelButton] },
                })];
        });
    }); },
};
var errors = {
    nameLength: function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, ctx.reply("".concat(utils_1.errEmoji, " \u0418\u043C\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0434\u043E 16 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432"))];
            });
        });
    },
    ageShouldBeNumber: function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, ctx.reply("".concat(utils_1.errEmoji, " \u0412\u043E\u0437\u0440\u0430\u0441\u0442 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0447\u0438\u0441\u043B\u043E\u043C"))];
            });
        });
    },
    ageMoreThan: function (ctx, age) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, ctx.reply("".concat(utils_1.errEmoji, " \u0412\u0430\u043C \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u044C\u0448\u0435 ").concat(age, " \u043B\u0435\u0442!"))];
            });
        });
    },
    ageLessThan: function (ctx, age) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, ctx.reply("".concat(utils_1.errEmoji, " \u0412\u0430\u043C \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043D\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 ").concat(age, " \u043B\u0435\u0442!"))];
            });
        });
    },
    cityNotSelected: function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, ctx.reply("".concat(utils_1.errEmoji, " \u0412\u044B \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043B\u0438 \u0433\u043E\u0440\u043E\u0434"))];
            });
        });
    },
    yourSentNotAPhoto: function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, ctx.reply("".concat(utils_1.errEmoji, " \u0412\u044B \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u043B\u0438 \u043D\u0435 \u0444\u043E\u0442\u043E"))];
            });
        });
    },
    aboutMeTextMustBeLessThan: function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, ctx.reply("".concat(utils_1.errEmoji, " \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0434\u043E 256 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432"))];
            });
        });
    },
    yourNotSkipAndWriteAboutMe: function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, ctx.reply("".concat(utils_1.errEmoji, " \u0412\u044B \u043D\u0435 \u043D\u0430\u043F\u0438\u0441\u0430\u043B\u0438 \u043E \u0441\u0435\u0431\u0435 \u0438 \u043D\u0435 \u043F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u043B\u0438"))];
            });
        });
    },
};
exports.editMyProfileScene = new telegraf_1.Scenes.WizardScene(enums_1.Scene.edit_my_profile, (0, async_wrapper_1.default)(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var editKey, cities;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!ctx.callbackQuery) return [3, 2];
                return [4, ctx.answerCbQuery()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                editKey = ctx.scene.state.args[1];
                if (!(editKey === 'name')) return [3, 4];
                return [4, messages.typeName(ctx)];
            case 3:
                _a.sent();
                return [3, 14];
            case 4:
                if (!(editKey === 'age')) return [3, 6];
                return [4, messages.typeAge(ctx)];
            case 5:
                _a.sent();
                return [3, 14];
            case 6:
                if (!(editKey === 'city')) return [3, 9];
                return [4, (0, city_1.getAllCities)()];
            case 7:
                cities = _a.sent();
                if (!cities.length)
                    throw new errors_1.FatalError('Города не найдены', true, true);
                return [4, messages.selectCity(ctx, cities)];
            case 8:
                _a.sent();
                return [3, 14];
            case 9:
                if (!(editKey === 'aboutMe')) return [3, 11];
                return [4, messages.aboutMe(ctx)];
            case 10:
                _a.sent();
                return [3, 14];
            case 11:
                if (!(editKey === 'photo')) return [3, 13];
                return [4, messages.changePhotos(ctx)];
            case 12:
                _a.sent();
                return [3, 14];
            case 13: throw new errors_1.FatalError('Неверный ключ', true, true);
            case 14: return [2, ctx.wizard.next()];
        }
    });
}); }), (0, async_wrapper_1.default)(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var text, editKey, value, age, _a, _, cityId, city, _b, skip, photos, savedPhotos, args, _c, profile_2, user_2, _d, profile, user;
    var _e, _f;
    var _g, _h, _j, _k, _l;
    return __generator(this, function (_m) {
        switch (_m.label) {
            case 0:
                if (!ctx.callbackQuery) return [3, 2];
                return [4, ctx.answerCbQuery()];
            case 1:
                _m.sent();
                _m.label = 2;
            case 2:
                text = (_g = ctx.text) === null || _g === void 0 ? void 0 : _g.trim();
                editKey = ctx.scene.state.args[1];
                if (!(editKey === 'name')) return [3, 5];
                if (ctx.callbackQuery)
                    throw new errors_1.ValidateError('Неверный формат', true);
                if (!(!text || text.length > 16)) return [3, 4];
                return [4, errors.nameLength(ctx)];
            case 3: return [2, _m.sent()];
            case 4:
                value = text;
                return [3, 48];
            case 5:
                if (!(editKey === 'age')) return [3, 12];
                if (ctx.callbackQuery)
                    throw new errors_1.ValidateError('Неверный формат', true);
                age = Number((_h = ctx.text) === null || _h === void 0 ? void 0 : _h.trim());
                if (!(!age || Number.isNaN(age))) return [3, 7];
                return [4, errors.ageShouldBeNumber(ctx)];
            case 6: return [2, _m.sent()];
            case 7:
                age = Math.floor(age);
                if (!(age < 16)) return [3, 9];
                return [4, errors.ageMoreThan(ctx, 16)];
            case 8: return [2, _m.sent()];
            case 9:
                if (!(age > 80)) return [3, 11];
                return [4, errors.ageLessThan(ctx, 80)];
            case 10: return [2, _m.sent()];
            case 11:
                value = age;
                return [3, 48];
            case 12:
                if (!(editKey === 'city')) return [3, 20];
                if (!ctx.callbackQuery) return [3, 14];
                return [4, ctx.answerCbQuery()];
            case 13:
                _m.sent();
                _m.label = 14;
            case 14:
                _a = __read((0, utils_1.parseArgs)(ctx), 2), _ = _a[0], cityId = _a[1];
                if (!!cityId) return [3, 16];
                return [4, errors.cityNotSelected(ctx)];
            case 15: return [2, _m.sent()];
            case 16: return [4, (0, city_1.getCityById)(cityId)];
            case 17:
                city = _m.sent();
                if (!!city) return [3, 19];
                return [4, errors.cityNotSelected(ctx)];
            case 18: return [2, _m.sent()];
            case 19:
                value = city.name;
                return [3, 48];
            case 20:
                if (!(editKey === 'aboutMe')) return [3, 27];
                if (!ctx.callbackQuery) return [3, 22];
                return [4, ctx.answerCbQuery()];
            case 21:
                _m.sent();
                _m.label = 22;
            case 22:
                _b = __read((0, utils_1.parseArgs)(ctx), 1), skip = _b[0];
                if (!(text && text.length > 256)) return [3, 24];
                return [4, errors.aboutMeTextMustBeLessThan(ctx)];
            case 23: return [2, _m.sent()];
            case 24:
                if (!(!text && skip !== 'skip')) return [3, 26];
                return [4, errors.yourNotSkipAndWriteAboutMe(ctx)];
            case 25: return [2, _m.sent()];
            case 26:
                value = skip === 'skip' ? null : text;
                return [3, 48];
            case 27:
                if (!(editKey === 'photo')) return [3, 48];
                if (!ctx.callbackQuery) return [3, 29];
                return [4, ctx.answerCbQuery()];
            case 28:
                _m.sent();
                _m.label = 29;
            case 29:
                if (!Array.isArray((_j = ctx.scene.state) === null || _j === void 0 ? void 0 : _j.value)) {
                    ctx.scene.state.value = [];
                }
                photos = (_l = (_k = ctx.message) === null || _k === void 0 ? void 0 : _k.photo) === null || _l === void 0 ? void 0 : _l.map(function (photo) { return photo.file_id; });
                savedPhotos = ctx.scene.state.value;
                args = (0, utils_1.parseArgs)(ctx);
                if (!(!(photos === null || photos === void 0 ? void 0 : photos.length) && args[0] !== 'end_photos' && args[0] !== 'change_photos')) return [3, 31];
                return [4, errors.yourSentNotAPhoto(ctx)];
            case 30: return [2, _m.sent()];
            case 31:
                if (!(args[0] === 'end_photos')) return [3, 39];
                if (!(args[1] === true)) return [3, 34];
                return [4, messages.selectedPhotos(ctx, savedPhotos)];
            case 32:
                _m.sent();
                return [4, messages.selectPhotoAction(ctx)];
            case 33: return [2, _m.sent()];
            case 34: return [4, (0, user_1.getUserByTgIdWithProfile)(ctx.from.id)];
            case 35:
                _c = _m.sent(), profile_2 = _c.profile, user_2 = _c.user;
                if (!profile_2 || !user_2)
                    throw new errors_1.FatalError('Профиль/пользователь не найдены', true, true);
                return [4, (0, profile_1.updateProfile)(profile_2.id, (_e = {}, _e[editKey] = ctx.scene.state.value, _e))];
            case 36:
                _m.sent();
                return [4, (0, action_1.myProfileAction)(ctx)];
            case 37:
                _m.sent();
                return [2, ctx.scene.leave()];
            case 38: return [3, 48];
            case 39:
                if (!(args[0] === 'change_photos')) return [3, 41];
                ctx.scene.state.value = [];
                return [4, messages.changePhotos(ctx)];
            case 40: return [2, _m.sent()];
            case 41:
                if (!(photos === null || photos === void 0 ? void 0 : photos.length)) return [3, 48];
                if (!(savedPhotos.length >= 3)) return [3, 43];
                return [4, messages.tooManyPhotos(ctx)];
            case 42: return [2, _m.sent()];
            case 43:
                ctx.scene.state.value.push(photos === null || photos === void 0 ? void 0 : photos.at(-1));
                if (!(ctx.scene.state.value.length < 3)) return [3, 45];
                return [4, messages.quantityCanSend(ctx, ctx.scene.state.value.length)];
            case 44: return [2, _m.sent()];
            case 45: return [4, messages.selectedPhotos(ctx, savedPhotos)];
            case 46:
                _m.sent();
                return [4, messages.selectPhotoAction(ctx)];
            case 47: return [2, _m.sent()];
            case 48: return [4, (0, user_1.getUserByTgIdWithProfile)(ctx.from.id)];
            case 49:
                _d = _m.sent(), profile = _d.profile, user = _d.user;
                if (!profile || !user)
                    throw new errors_1.FatalError('Профиль/пользователь не найдены', true, true);
                return [4, (0, profile_1.updateProfile)(profile.id, (_f = {}, _f[editKey] = value, _f))];
            case 50:
                _m.sent();
                return [4, (0, action_1.myProfileAction)(ctx)];
            case 51:
                _m.sent();
                return [2, ctx.scene.leave()];
        }
    });
}); }));

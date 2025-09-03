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
exports.createProfileScene = void 0;
var telegraf_1 = require("telegraf");
var enums_1 = require("../../../types/enums");
var async_wrapper_1 = __importDefault(require("../../../utils/async-wrapper"));
var errors_1 = require("../../../utils/errors");
var utils_1 = require("../../../utils");
var profile_1 = require("../../../db/repository/profile");
var user_1 = require("../../../db/repository/user");
var action_1 = require("../../base/action");
var city_1 = require("../../../db/repository/city");
var messages = {
    typeName: function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2, ctx.reply('👤 Введите ваше имя:')];
    }); }); },
    typeAge: function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2, ctx.reply('🏮 Введите ваш возраст:')];
    }); }); },
    selectCity: function (ctx, cities) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, ctx.reply('🌏 Выберите свой город:', {
                    reply_markup: {
                        inline_keyboard: __spreadArray([], __read((0, utils_1.chunkArray)(cities.map(function (city) { return ({ text: city.name, callback_data: "select_city:".concat(city.id) }); }), 2)), false),
                    },
                })];
        });
    }); },
    sendPhoto: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, ctx.reply('📸 Теперь отправь свои фотки\n\n<i>* До 3-х штук. В формате фото, не документа</i>', {
                    parse_mode: 'HTML',
                })];
        });
    }); },
    changePhotos: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, ctx.reply('📸 Отправь новые фотки\n\n<i>* До 3-х штук. В формате фото, не документа</i>', {
                    parse_mode: 'HTML',
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
                        inline_keyboard: [[{ text: '✅ Сохранить выбранные фото', callback_data: 'end_photos' }], [{ text: '✏️ Выбрать другие фото', callback_data: 'change_photos' }]],
                    },
                })];
        });
    }); },
    aboutMe: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, ctx.reply('✍️ Расскажи о себе\n\n<i>* Максимум 256 символов</i>', {
                    parse_mode: 'HTML',
                    reply_markup: { inline_keyboard: [[{ text: 'Пропустить', callback_data: 'skip' }]] },
                })];
        });
    }); },
    quantityCanSend: function (ctx, photosLength) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, ctx.reply("\u2795 \u0422\u044B \u043C\u043E\u0436\u0435\u0448\u044C \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0435\u0449\u0435 ".concat(3 - photosLength, " \u0444\u043E\u0442\u043E."), {
                    reply_markup: { inline_keyboard: [[{ text: 'Сохранить выбранные фото', callback_data: 'end_photos:true' }]] },
                })];
        });
    }); },
    tooManyPhotos: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, ctx.reply('🐤 Вы отправили слишком много фото. Сохранить первые 3?', {
                    reply_markup: { inline_keyboard: [[{ text: 'Сохранить выбранные фото', callback_data: 'end_photos' }]] },
                })];
        });
    }); },
    profileCreated: function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2, ctx.reply('Профиль создан 💫')];
    }); }); },
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
exports.createProfileScene = new telegraf_1.Scenes.WizardScene(enums_1.Scene.create_profile, (0, async_wrapper_1.default)(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!ctx.callbackQuery) return [3, 2];
                return [4, ctx.answerCbQuery()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [4, messages.typeName(ctx)];
            case 3:
                _a.sent();
                return [2, ctx.wizard.next()];
        }
    });
}); }), (0, async_wrapper_1.default)(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var name;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                name = (_a = ctx.text) === null || _a === void 0 ? void 0 : _a.trim();
                if (!(!name || name.length > 16)) return [3, 2];
                return [4, errors.nameLength(ctx)];
            case 1: return [2, _b.sent()];
            case 2:
                ctx.scene.state.name = name;
                return [4, messages.typeAge(ctx)];
            case 3:
                _b.sent();
                return [2, ctx.wizard.next()];
        }
    });
}); }), (0, async_wrapper_1.default)(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var age, cities;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                age = Number((_a = ctx.text) === null || _a === void 0 ? void 0 : _a.trim());
                if (!(!age || Number.isNaN(age))) return [3, 2];
                return [4, errors.ageShouldBeNumber(ctx)];
            case 1: return [2, _b.sent()];
            case 2:
                if (!(age < 16)) return [3, 4];
                return [4, errors.ageMoreThan(ctx, 16)];
            case 3: return [2, _b.sent()];
            case 4:
                if (!(age > 80)) return [3, 6];
                return [4, errors.ageLessThan(ctx, 80)];
            case 5: return [2, _b.sent()];
            case 6:
                ctx.scene.state.age = Math.floor(age);
                return [4, (0, city_1.getAllCities)()];
            case 7:
                cities = _b.sent();
                if (!cities.length)
                    throw new errors_1.FatalError('Города не найдены', true, true);
                return [4, messages.selectCity(ctx, cities)];
            case 8:
                _b.sent();
                return [2, ctx.wizard.next()];
        }
    });
}); }), (0, async_wrapper_1.default)(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _, cityId, city;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!ctx.callbackQuery) return [3, 2];
                return [4, ctx.answerCbQuery()];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                _a = __read((0, utils_1.parseArgs)(ctx), 2), _ = _a[0], cityId = _a[1];
                if (!!cityId) return [3, 4];
                return [4, errors.cityNotSelected(ctx)];
            case 3: return [2, _b.sent()];
            case 4: return [4, (0, city_1.getCityById)(cityId)];
            case 5:
                city = _b.sent();
                if (!!city) return [3, 7];
                return [4, errors.cityNotSelected(ctx)];
            case 6: return [2, _b.sent()];
            case 7:
                ctx.scene.state.city = city;
                return [4, messages.sendPhoto(ctx)];
            case 8:
                _b.sent();
                return [2, ctx.wizard.next()];
        }
    });
}); }), (0, async_wrapper_1.default)(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var photos, savedPhotos, args;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!ctx.callbackQuery) return [3, 2];
                return [4, ctx.answerCbQuery()];
            case 1:
                _d.sent();
                _d.label = 2;
            case 2:
                if (!Array.isArray((_a = ctx.scene.state) === null || _a === void 0 ? void 0 : _a.photos)) {
                    ctx.scene.state.photos = [];
                }
                photos = (_c = (_b = ctx.message) === null || _b === void 0 ? void 0 : _b.photo) === null || _c === void 0 ? void 0 : _c.map(function (photo) { return photo.file_id; });
                savedPhotos = ctx.scene.state.photos;
                args = (0, utils_1.parseArgs)(ctx);
                if (!(!(photos === null || photos === void 0 ? void 0 : photos.length) && args[0] !== 'end_photos' && args[0] !== 'change_photos')) return [3, 4];
                return [4, errors.yourSentNotAPhoto(ctx)];
            case 3: return [2, _d.sent()];
            case 4:
                if (!(args[0] === 'end_photos')) return [3, 10];
                if (!(args[1] === true)) return [3, 7];
                return [4, messages.selectedPhotos(ctx, savedPhotos)];
            case 5:
                _d.sent();
                return [4, messages.selectPhotoAction(ctx)];
            case 6: return [2, _d.sent()];
            case 7: return [4, messages.aboutMe(ctx)];
            case 8:
                _d.sent();
                return [2, ctx.wizard.next()];
            case 9: return [3, 19];
            case 10:
                if (!(args[0] === 'change_photos')) return [3, 12];
                ctx.scene.state.photos = [];
                return [4, messages.changePhotos(ctx)];
            case 11: return [2, _d.sent()];
            case 12:
                if (!(photos === null || photos === void 0 ? void 0 : photos.length)) return [3, 19];
                if (!(savedPhotos.length >= 3)) return [3, 14];
                return [4, messages.tooManyPhotos(ctx)];
            case 13: return [2, _d.sent()];
            case 14:
                ctx.scene.state.photos.push(photos === null || photos === void 0 ? void 0 : photos.at(-1));
                if (!(ctx.scene.state.photos.length < 3)) return [3, 16];
                return [4, messages.quantityCanSend(ctx, ctx.scene.state.photos.length)];
            case 15: return [2, _d.sent()];
            case 16: return [4, messages.selectedPhotos(ctx, savedPhotos)];
            case 17:
                _d.sent();
                return [4, messages.selectPhotoAction(ctx)];
            case 18: return [2, _d.sent()];
            case 19: return [2];
        }
    });
}); }), (0, async_wrapper_1.default)(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var aboutMe, _a, skip, user, profile;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!ctx.callbackQuery) return [3, 2];
                return [4, ctx.answerCbQuery()];
            case 1:
                _c.sent();
                _c.label = 2;
            case 2:
                aboutMe = (_b = ctx.text) === null || _b === void 0 ? void 0 : _b.trim();
                _a = __read((0, utils_1.parseArgs)(ctx), 1), skip = _a[0];
                if (!(aboutMe && aboutMe.length > 256)) return [3, 4];
                return [4, errors.aboutMeTextMustBeLessThan(ctx)];
            case 3: return [2, _c.sent()];
            case 4:
                if (!(!aboutMe && skip !== 'skip')) return [3, 6];
                return [4, errors.yourNotSkipAndWriteAboutMe(ctx)];
            case 5: return [2, _c.sent()];
            case 6: return [4, (0, user_1.getUserByTgId)(ctx.from.id)];
            case 7:
                user = _c.sent();
                if (!user)
                    throw new errors_1.FatalError('Пользователь не найден', true, true);
                return [4, (0, profile_1.createProfile)({
                        age: ctx.scene.state.age,
                        city: ctx.scene.state.city.name,
                        name: ctx.scene.state.name,
                        photo: ctx.scene.state.photos,
                        userId: user.id,
                        aboutMe: skip === 'skip' ? undefined : aboutMe,
                    })];
            case 8:
                profile = _c.sent();
                console.log(profile);
                return [4, messages.profileCreated(ctx)];
            case 9:
                _c.sent();
                return [4, (0, action_1.menuAction)(ctx)];
            case 10:
                _c.sent();
                return [2, ctx.scene.leave()];
        }
    });
}); }));

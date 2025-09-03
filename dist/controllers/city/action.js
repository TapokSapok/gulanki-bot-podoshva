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
exports.addCityAction = addCityAction;
exports.removeCityAction = removeCityAction;
exports.citiesAction = citiesAction;
var message_1 = require("./message");
var errors_1 = require("../../utils/errors");
var city_1 = require("../../db/repository/city");
function addCityAction(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, cityName, publicChannelId, moderateChannelId, existsCity, city;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = __read((_b = ctx === null || ctx === void 0 ? void 0 : ctx.payload) === null || _b === void 0 ? void 0 : _b.split(' '), 3), cityName = _a[0], publicChannelId = _a[1], moderateChannelId = _a[2];
                    publicChannelId = Number(publicChannelId);
                    moderateChannelId = Number(moderateChannelId);
                    if (!cityName || Number.isNaN(publicChannelId) || Number.isNaN(moderateChannelId)) {
                        throw new errors_1.ValidateError('Формат команды:\n/add_city <city> <public channel id> <moderate channel id>\n\n❗️ Пример команды:\n/add_city Москва -1002853462255 -1002853462255');
                    }
                    return [4, (0, city_1.getCityByName)(cityName)];
                case 1:
                    existsCity = _c.sent();
                    if (existsCity)
                        throw new errors_1.ValidateError("\u0413\u043E\u0440\u043E\u0434 ".concat(cityName, " \u0443\u0436\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D"));
                    return [4, (0, city_1.createCity)(cityName, publicChannelId, moderateChannelId)];
                case 2:
                    city = _c.sent();
                    return [4, (0, message_1.addCityMessage)(ctx, city.name)];
                case 3: return [2, _c.sent()];
            }
        });
    });
}
function removeCityAction(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var cityName, existsCity, city;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cityName = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.payload) === null || _a === void 0 ? void 0 : _a.split(' ')[0];
                    if (!cityName)
                        throw new errors_1.ValidateError('Введите название города, который хотите удалить');
                    return [4, (0, city_1.getCityByName)(cityName)];
                case 1:
                    existsCity = _b.sent();
                    if (!existsCity)
                        throw new errors_1.ValidateError("\u0413\u043E\u0440\u043E\u0434\u0430 ".concat(cityName, " \u0438 \u0442\u0430\u043A \u043D\u0435\u0442"));
                    return [4, (0, city_1.removeCity)(cityName)];
                case 2:
                    city = _b.sent();
                    return [4, (0, message_1.removeCityMessage)(ctx, city.name)];
                case 3: return [2, _b.sent()];
            }
        });
    });
}
function citiesAction(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var cities;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, (0, city_1.getAllCities)()];
                case 1:
                    cities = _a.sent();
                    return [4, (0, message_1.citiesMessage)(ctx, cities)];
                case 2: return [2, _a.sent()];
            }
        });
    });
}

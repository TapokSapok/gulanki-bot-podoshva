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
var errors_1 = require("./errors");
var action_1 = require("../controllers/base/action");
function asyncWrapper(fn) {
    var _this = this;
    return function (ctx, next) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                return [2, (_a = fn(ctx, next)) === null || _a === void 0 ? void 0 : _a.catch(function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var errMsg, errMsg, errMsg;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log(e);
                                    if (!(e instanceof errors_1.ValidateError)) return [3, 5];
                                    errMsg = 'Ошибка валидации';
                                    return [4, ctx.reply(e.message || errMsg)];
                                case 1:
                                    _a.sent();
                                    if (!e.skip) return [3, 4];
                                    return [4, ctx.scene.leave()];
                                case 2:
                                    _a.sent();
                                    return [4, (0, action_1.menuAction)(ctx)];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4: return [3, 15];
                                case 5:
                                    if (!(e instanceof errors_1.FatalError)) return [3, 10];
                                    errMsg = 'Фатальная ошибка';
                                    return [4, ctx.reply(e.message || errMsg)];
                                case 6:
                                    _a.sent();
                                    if (!e.skip) return [3, 9];
                                    return [4, ctx.scene.leave()];
                                case 7:
                                    _a.sent();
                                    return [4, (0, action_1.menuAction)(ctx)];
                                case 8:
                                    _a.sent();
                                    _a.label = 9;
                                case 9: return [3, 15];
                                case 10:
                                    errMsg = 'Упс, произошла неизвестная ошибка';
                                    return [4, ctx.scene.leave()];
                                case 11:
                                    _a.sent();
                                    if (!(ctx.updateType === 'callback_query')) return [3, 13];
                                    return [4, ctx.answerCbQuery(errMsg, { cache_time: 5 })];
                                case 12:
                                    _a.sent();
                                    return [3, 15];
                                case 13: return [4, ctx.reply(errMsg)];
                                case 14:
                                    _a.sent();
                                    _a.label = 15;
                                case 15:
                                    if (e.withoutNext)
                                        return [2];
                                    else
                                        return [2, next()];
                                    return [2];
                            }
                        });
                    }); })];
            });
        }); })();
    };
}
exports.default = asyncWrapper;

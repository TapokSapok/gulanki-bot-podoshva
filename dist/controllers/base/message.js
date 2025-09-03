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
exports.menuMessage = menuMessage;
exports.moderateProfileText = moderateProfileText;
var utils_1 = require("../../utils");
var dayjs_1 = __importDefault(require("dayjs"));
function menuMessage(ctx_1) {
    return __awaiter(this, arguments, void 0, function (ctx, isReply) {
        if (isReply === void 0) { isReply = false; }
        return __generator(this, function (_a) {
            return [2, ctx[ctx.callbackQuery && !isReply ? 'editMessageText' : 'reply']('👋 Добро пожаловать в бот гулянок!', {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: '🚶 Создать заявку', callback_data: 'create_event' },
                                { text: '📰 Мой профиль', callback_data: 'my_profile' },
                            ],
                        ],
                    },
                })];
        });
    });
}
function moderateProfileText(profile, user) {
    return "\uD83D\uDCF0  \u041F\u0440\u043E\u0444\u0438\u043B\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F  \u2335\n\n\uD83D\uDCA0 \u0410\u0439\u0434\u0438: <code>".concat(user.tg_id, "</code>\n\uD83D\uDC64 \u0418\u043C\u044F: <b><i>").concat(profile.name, "</i></b>\n\uD83C\uDFEE \u0412\u043E\u0437\u0440\u0430\u0441\u0442: <b><i>").concat(profile.age, "</i></b>\n\uD83C\uDF0D \u0413\u043E\u0440\u043E\u0434: <b><i>").concat(profile.city, "</i></b>\n\uD83E\uDE78 \u041A\u0430\u0440\u043C\u0430: <b><i>").concat(user.karma, "</i></b>\n\n\u270D\uFE0F \u041E \u0441\u0435\u0431\u0435: ").concat(profile.aboutMe ? "<blockquote>".concat(profile.aboutMe, "</blockquote>") : '<i>Не указано</i>', "\n\n\u2139\uFE0F \u0414\u0430\u0442\u0430 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u0432\u0445\u043E\u0434\u0430: ").concat((0, utils_1.formatDate)(user.createdAt), " (").concat((0, dayjs_1.default)(user.createdAt).fromNow(), ")");
}

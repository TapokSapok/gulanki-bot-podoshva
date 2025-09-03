"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelButton = exports.BACK_TEXT = exports.errEmoji = void 0;
exports.formatDate = formatDate;
exports.parseArgs = parseArgs;
exports.chunkArray = chunkArray;
exports.isValidDateFormat = isValidDateFormat;
var dayjs_1 = __importDefault(require("dayjs"));
exports.errEmoji = '🚫';
exports.BACK_TEXT = '‹ Назад';
exports.cancelButton = [{ text: '× Отменить', callback_data: 'CANCEL_WIZARD' }];
function formatDate(date) {
    return (0, dayjs_1.default)(date).format("D MMMM, HH:mm");
}
function parseArgs(ctx) {
    var _a, _b, _c, _d, _e, _f;
    if (!((_b = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.update) === null || _a === void 0 ? void 0 : _a.callback_query) === null || _b === void 0 ? void 0 : _b.data))
        return [];
    return (_f = (_e = (_d = (_c = ctx === null || ctx === void 0 ? void 0 : ctx.update) === null || _c === void 0 ? void 0 : _c.callback_query) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.split(':')) === null || _f === void 0 ? void 0 : _f.map(function (i) {
        if (i === 'true')
            return true;
        else if (i === 'false')
            return false;
        else if (Number.isNaN(Number(i)))
            return i;
        else
            return Number(i);
    });
}
function chunkArray(arr, size) {
    if (size <= 0)
        throw new Error('Size must be greater than 0');
    var result = [];
    for (var i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}
function isValidDateFormat(input) {
    var regex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])$/;
    return regex.test(input);
}

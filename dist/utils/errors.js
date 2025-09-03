"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FatalError = exports.ValidateError = void 0;
var ValidateError = (function (_super) {
    __extends(ValidateError, _super);
    function ValidateError(message, withoutNext, skip) {
        if (withoutNext === void 0) { withoutNext = true; }
        if (skip === void 0) { skip = false; }
        var _this = this;
        if (message)
            message = '🚫 ' + message;
        _this = _super.call(this, message) || this;
        _this.skip = false;
        _this.withoutNext = false;
        _this.skip = skip;
        _this.withoutNext = withoutNext;
        Object.setPrototypeOf(_this, ValidateError.prototype);
        return _this;
    }
    return ValidateError;
}(Error));
exports.ValidateError = ValidateError;
var FatalError = (function (_super) {
    __extends(FatalError, _super);
    function FatalError(message, withoutNext, skip) {
        if (withoutNext === void 0) { withoutNext = true; }
        if (skip === void 0) { skip = false; }
        var _this = this;
        if (message)
            message = '🚫 ' + message;
        if (message === null)
            message = undefined;
        _this = _super.call(this, message) || this;
        _this.skip = false;
        _this.withoutNext = false;
        _this.skip = skip;
        _this.withoutNext = withoutNext;
        Object.setPrototypeOf(_this, FatalError.prototype);
        return _this;
    }
    return FatalError;
}(Error));
exports.FatalError = FatalError;

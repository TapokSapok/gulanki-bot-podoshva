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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByTgIdWithProfile = getUserByTgIdWithProfile;
exports.getUserByTgId = getUserByTgId;
exports.createUser = createUser;
exports.updateUser = updateUser;
var drizzle_orm_1 = require("drizzle-orm");
var db_1 = __importDefault(require("../db"));
var profile_1 = require("../schema/profile");
var user_1 = require("../schema/user");
function getUserByTgIdWithProfile(tgId) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, result;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4, db_1.default
                        .select({
                        user: user_1.userT,
                        profile: profile_1.profileT,
                    })
                        .from(user_1.userT)
                        .leftJoin(profile_1.profileT, (0, drizzle_orm_1.eq)(user_1.userT.id, profile_1.profileT.userId))
                        .where((0, drizzle_orm_1.eq)(user_1.userT.tg_id, tgId))];
                case 1:
                    _a = __read.apply(void 0, [_d.sent(), 1]), result = _a[0];
                    return [2, {
                            user: (_b = result === null || result === void 0 ? void 0 : result.user) !== null && _b !== void 0 ? _b : null,
                            profile: (_c = result === null || result === void 0 ? void 0 : result.profile) !== null && _c !== void 0 ? _c : null,
                        }];
            }
        });
    });
}
function getUserByTgId(tgId) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, db_1.default.select().from(user_1.userT).where((0, drizzle_orm_1.eq)(user_1.userT.tg_id, tgId))];
                case 1:
                    _a = __read.apply(void 0, [_b.sent(), 1]), result = _a[0];
                    return [2, result];
            }
        });
    });
}
function createUser(data) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, db_1.default.insert(user_1.userT).values(data).returning()];
                case 1:
                    _a = __read.apply(void 0, [_b.sent(), 1]), result = _a[0];
                    return [2, result];
            }
        });
    });
}
function updateUser(id, data) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, db_1.default.update(user_1.userT).set(data).where((0, drizzle_orm_1.eq)(user_1.userT.id, id)).returning()];
                case 1:
                    _a = __read.apply(void 0, [_b.sent(), 1]), result = _a[0];
                    return [2, result];
            }
        });
    });
}

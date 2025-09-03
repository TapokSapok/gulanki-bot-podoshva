"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileT = void 0;
var t = __importStar(require("drizzle-orm/pg-core"));
var user_1 = require("./user");
var drizzle_orm_1 = require("drizzle-orm");
exports.profileT = t.pgTable('profile', {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: t
        .integer('user_id')
        .notNull()
        .unique()
        .references(function () { return user_1.userT.id; }),
    name: t.varchar({ length: 16 }).notNull(),
    age: t.integer().notNull(),
    photo: t
        .text()
        .array()
        .notNull()
        .default((0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["array[]::text[]"], ["array[]::text[]"])))),
    city: t.varchar({ length: 32 }).notNull(),
    aboutMe: t.varchar('about_me', { length: 256 }),
    createdAt: t
        .timestamp('created_at')
        .notNull()
        .$defaultFn(function () { return new Date(); }),
});
var templateObject_1;

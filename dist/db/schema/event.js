"use strict";
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
exports.eventT = void 0;
var t = __importStar(require("drizzle-orm/pg-core"));
var profile_1 = require("./profile");
var user_1 = require("./user");
exports.eventT = t.pgTable('event', {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    profileId: t
        .integer()
        .notNull()
        .references(function () { return profile_1.profileT.id; }),
    userId: t
        .integer()
        .notNull()
        .references(function () { return user_1.userT.id; }),
    publicChannelId: t.bigint({ mode: 'number' }).notNull(),
    moderateChannelId: t.bigint({ mode: 'number' }).notNull(),
    publicMessageId: t.bigint({ mode: 'number' }),
    publicChannelUsername: t.varchar({ length: 32 }),
    isApproved: t.boolean().notNull().default(false),
    isRejected: t.boolean().notNull().default(false),
    description: t.varchar({ length: 256 }).notNull(),
    zone: t.varchar({ length: 16 }).notNull(),
    responses: t.integer().notNull().default(0),
    location: t.varchar({ length: 32 }),
    eventDate: t.timestamp().notNull(),
    createdAt: t
        .timestamp('created_at')
        .notNull()
        .$defaultFn(function () { return new Date(); }),
});

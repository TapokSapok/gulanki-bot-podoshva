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
exports.userT = exports.Role = void 0;
var t = __importStar(require("drizzle-orm/pg-core"));
var Role;
(function (Role) {
    Role["Admin"] = "admin";
    Role["Moderator"] = "moderator";
    Role["Default"] = "default";
})(Role || (exports.Role = Role = {}));
exports.userT = t.pgTable('user', {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    tg_id: t.bigint({ mode: 'number' }).unique().notNull(),
    username: t.varchar({ length: 32 }).unique(),
    firstName: t.varchar('first_name', { length: 64 }),
    karma: t.integer().notNull().default(0),
    role: t.varchar({ length: 32 }).$type().default(Role.Default).notNull(),
    isBanned: t.boolean().notNull().default(false),
    createdAt: t
        .timestamp('created_at')
        .notNull()
        .$defaultFn(function () { return new Date(); }),
});

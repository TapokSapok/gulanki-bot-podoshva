"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var postgres_1 = __importDefault(require("postgres"));
var config_1 = require("../config");
var postgres_js_1 = require("drizzle-orm/postgres-js");
exports.default = (0, postgres_js_1.drizzle)((0, postgres_1.default)(config_1.Config.db));

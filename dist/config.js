"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
require("dotenv/config");
var Config = (function () {
    function Config() {
    }
    Config.bot = {
        token: process.env.BOT_TOKEN,
    };
    Config.db = {
        database: process.env.DB_BASE,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    };
    return Config;
}());
exports.Config = Config;

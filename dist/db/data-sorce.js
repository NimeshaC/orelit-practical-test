"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedOrmConfig = exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const env = process.env.NODE_ENV || "development";
const path = ".env.development";
dotenv.config({ path });
exports.dataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/db/migrations/*.js"],
    synchronize: true,
    logging: false,
};
console.log(process.env.DB_PORT);
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
exports.seedOrmConfig = {
    ...exports.dataSourceOptions,
    logging: ["error", "warn"],
};
//# sourceMappingURL=data-sorce.js.map
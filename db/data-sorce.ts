import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";

const env = process.env.NODE_ENV || "development";
const path = ".env.development";

dotenv.config({ path });

export const dataSourceOptions: DataSourceOptions = {
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

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

export const seedOrmConfig: TypeOrmModuleOptions = {
  ...dataSourceOptions,
  logging: ["error", "warn"],
};

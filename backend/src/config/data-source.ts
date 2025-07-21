import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

const isCompiled: boolean = __dirname.includes("dist");

export const AppDataSource: DataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  migrations: [isCompiled ? "dist/migrations/*.js" : "src/migrations/*.ts"],
  entities: [isCompiled ? "dist/entities/*.js" : "src/entities/*.ts"],
  // or use glob paths if many
  logging: false,
});

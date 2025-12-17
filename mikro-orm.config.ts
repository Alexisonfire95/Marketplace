import 'dotenv/config';
import { defineConfig } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { Migrator } from "@mikro-orm/migrations";
import { EntityGenerator } from "@mikro-orm/entity-generator";
import { SeedManager } from "@mikro-orm/seeder";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import * as process from "node:process";

// Наші нові сутності
import { User } from "./src/user/user.entity";
import { UserProfile } from "./src/user/user-profile.entity";

export default defineConfig({
  driver: PostgreSqlDriver,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  entities: [User, UserProfile], // <--- ОСНОВНА ЗМІНА ТУТ
  debug: process.env.NODE_ENV !== "production",
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: "./migrations",
    pathTs: "./migrations",
  },
  seeder: {
    path: "./seeders",
    pathTs: "./seeders",
  },
  extensions: [Migrator, EntityGenerator, SeedManager],
});

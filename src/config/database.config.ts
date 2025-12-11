import { MikroOrmModuleOptions } from "@mikro-orm/nestjs"
import { ConfigService } from "@nestjs/config"
import { PostgreSqlDriver } from "@mikro-orm/postgresql"

export const getMikroOrmConfig = (
  configService: ConfigService
): MikroOrmModuleOptions => ({
  driver: PostgreSqlDriver,
  host: configService.get<string>("DB_HOST"),
  port: Number(configService.get<number>("DB_PORT")),
  user: configService.get<string>("DB_USER"),
  password: configService.get<string>("DB_PASSWORD"),
  dbName: configService.get<string>("DB_NAME"),
  debug: configService.get<string>("NODE_ENV") !== "production",
  autoLoadEntities: true
})

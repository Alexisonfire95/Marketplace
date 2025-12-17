import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { config } from "./config/config";
import { getMikroOrmConfig } from "./config/database.config";
import { UserModule } from "./user/user.module"; // <--- ІМПОРТУЄМО НОВИЙ МОДУЛЬ

@Module({
  imports: [
    ConfigModule.forRoot(config),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getMikroOrmConfig,
      driver: PostgreSqlDriver,
      inject: [ConfigService],
    }),
    UserModule, // <--- РЕЄСТРУЄМО ЙОГО ТУТ
  ],
  exports: [ConfigModule],
})
export class AppModule {}

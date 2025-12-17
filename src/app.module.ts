import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MikroOrmModule } from "@mikro-orm/nestjs"
import { PostgreSqlDriver } from "@mikro-orm/postgresql"
import { config } from "./config/config"
import { getMikroOrmConfig } from "./config/database.config"

@Module({
  imports: [
    ConfigModule.forRoot(config),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getMikroOrmConfig,
      driver: PostgreSqlDriver,
      inject: [ConfigService]
    })
  ],
  exports: [ConfigModule]
})
export class AppModule {}

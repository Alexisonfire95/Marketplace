import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './user.entity';
import { UserProfile } from './user-profile.entity';
import { UserService } from './user.service';

@Module({
  imports: [MikroOrmModule.forFeature([User, UserProfile])],
  providers: [UserService],
  exports: [UserService], // Ми експортуємо сервіс, щоб потім використати його в модулі аутентифікації
})
export class UserModule {}

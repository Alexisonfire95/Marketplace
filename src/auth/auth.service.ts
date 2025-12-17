import { ConflictException, Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User, UserRole } from '../user/user.entity';
import { UserProfile } from '../user/user-profile.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly em: EntityManager,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    // Перевірка, чи користувач вже існує, буде додана пізніше
    
    const passwordHash = await bcrypt.hash(registerDto.password, 10);

    return this.em.transactional(async (em) => {
      const user = em.create(User, {
        email: registerDto.email,
        passwordHash,
        role: UserRole.BUYER,
      });

      const userProfile = em.create(UserProfile, {
        user,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
      });
      
      user.profile = userProfile;

      await em.persistAndFlush([user, userProfile]);

      return user;
    });
  }
}

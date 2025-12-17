import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    // Ми не повертаємо пароль та інші чутливі дані
    return {
      id: user.id,
      email: user.email,
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
    };
  }
}

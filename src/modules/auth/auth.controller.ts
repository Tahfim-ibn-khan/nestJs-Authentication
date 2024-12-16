import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../DTOs/register.dto';
import { LoginDto } from '../DTOs/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('add') // Replaces 'register'
  async add(@Body() addDto: RegisterDto): Promise<string> {
    return this.authService.add(addDto);
  }

  @Post('get-in') // Replaces 'login'
  async getIn(@Body() getInDto: LoginDto): Promise<string> {
    const { email, password } = getInDto;
    return this.authService.getIn(email, password);
  }
}

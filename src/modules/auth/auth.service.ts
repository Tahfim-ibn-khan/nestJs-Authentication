import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from '../DTOs/register.dto';
import { LoginDto } from '../DTOs/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Replaces 'register' with 'add'
  async add(addDto: RegisterDto): Promise<string> {
    const { name, email, password } = addDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: 'CUSTOMER', // Default role
    });

    await this.userRepository.save(newUser);

    return 'User successfully added!';
  }

  // Replaces 'login' with 'getIn'
  async getIn(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password.');
    }

    return 'User successfully authenticated!';
  }
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcrypt';
import { PrismaService } from 'src/modules/database/prisma.service';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private prisma: PrismaService,
  ) {}
  async login({ username, password }: LoginDto) {
    const user = await this.usersService.findUserByUsername(username);
    if (user?.password === password) {
      const { password, ...result } = user;
      const access_token = await this.jwtService.signAsync(result);
      return { access_token };
    }
    throw new UnauthorizedException();
  }

  async register(data: RegisterDto) {
    const findUser = await this.usersService.findUserByUsername(data.username);
    if (findUser) throw new BadRequestException('User already exists');
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = { ...data, password: hashedPassword };
    const newUser = await this.prisma.user.create({ data: user });
    const { password, ...result } = user;
    const access_token = await this.jwtService.signAsync(result);
    return { access_token };
  }
}

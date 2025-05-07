import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ){}
  async login({ username, password }: LoginDto) {
    const user = await this.usersService.findUserByEmail(username);
    if (user?.password === password) {
      const { password, ...result } = user;
      const access_token = await this.jwtService.signAsync(result);
      return { access_token };
    }
    throw new UnauthorizedException();
  }

  async register(data: any) {
    
  }
}


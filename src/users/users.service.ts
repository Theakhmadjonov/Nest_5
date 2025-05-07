import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/modules/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.user.findFirst({ where: { id: +id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // return await this.prismaService.user.update({
    //   where: {
    //   id: +id
    //   },{
    //   data: updateUserDto
    // } })
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByUsername(username: string) {
    return await this.prismaService.user.findFirst({ where: { username } });
  }
}

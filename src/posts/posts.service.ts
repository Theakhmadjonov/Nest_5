import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/modules/database/prisma.service';
@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreatePostDto, user_id: string) {
    return await this.prisma.post.create({
      data: { ...data, user_id: +user_id },
    });
  }

  async findAllPosts() {
    return await this.prisma.post.findMany();
  }

  async findAllUserPosts(user_id: string) {
    return await this.prisma.post.findMany({ where: { user_id: +user_id } });
  }

  async findOne(id: string) {
    return await this.prisma.post.findFirst({ where: { id: +id } });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const updatedUser = await this.prisma.post.update({
      where: {
        id: +id,
      },
      data: updatePostDto,
    });
    return updatedUser;
  }

  async remove(id: string) {
    return await this.prisma.post.delete({
      where: {
        id: +id,
      },
    });
  }
}

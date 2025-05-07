import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/modules/database/prisma.service';
import bcrypt from "bcrypt"
@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreatePostDto) {
    return this.prisma.post.create({ data: { ...data, user_id: 1 } });
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

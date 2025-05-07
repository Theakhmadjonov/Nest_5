import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async addComment(post_id: string, user_id: string, dto: CreateCommentDto) {
    return await this.prisma.comment.create({
      data: {
        text: dto.text,
        post_id: +post_id,
        user_id: +user_id,
      },
    });
  }

  async getCommentsByPost(post_id: string) {
    return await this.prisma.comment.findMany({
      where: {
        post_id: +post_id,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async deleteComment(comment_id: string, user_id: string) {
    return await this.prisma.comment.deleteMany({
      where: {
        id: +comment_id,
        user_id: +user_id,
      },
    });
  }
}

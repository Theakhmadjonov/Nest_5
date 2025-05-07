import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/prisma.service';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}

  async addLike(post_id: string, user_id: string) {
    return await this.prisma.like.create({
      data: {
        post_id: +post_id,
        user_id: +user_id,
      },
    });
  }

  async removeLike(post_id: string, user_id: string) {
    return await this.prisma.like.deleteMany({
      where: {
        post_id: +post_id,
        user_id: +user_id,
      },
    });
  }

  async getPostLikesCount(post_id: string) {
    return await this.prisma.like.count({
      where: {
        post_id: +post_id,
      },
    });
  }

  async hasUserLiked(post_id: string, user_id: string) {
    const like = await this.prisma.like.findFirst({
      where: {
        post_id: +post_id,
        user_id: +user_id,
      },
    });
    return like;
  }
}

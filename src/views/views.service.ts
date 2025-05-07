import { Injectable } from '@nestjs/common';
import { CreateViewDto } from './dto/create-view.dto';
import { PrismaService } from 'src/modules/database/prisma.service';

@Injectable()
export class ViewsService {
  constructor(private readonly prisma: PrismaService) {}
  async addView(post_id: CreateViewDto, user_id: string) {
    return await this.prisma.view.create({
      data: { user_id: +user_id, post_id: +post_id },
    });
  }

  async getPosCountViews(post_id: string) {
    return await this.prisma.view.count({
      where: {
        post_id: +post_id,
      },
    });
  }
}

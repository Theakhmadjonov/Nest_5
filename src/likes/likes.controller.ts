import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CurrentUser } from 'src/common/decorators/users.decorators';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) { }
  
  @UseGuards(JwtGuard)
  @Post(':post_id')
  async likePost(@Param('post_id') post_id: string, @CurrentUser() user: any) {
    try {
      const user_id = user.id;
      return await this.likesService.addLike(post_id, user_id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtGuard)
  @Delete(':post_id')
  async unlikePost(@Param('post_id') post_id: string, @CurrentUser() user: any) {
    try {
      const user_id = user.id;
      return await this.likesService.removeLike(post_id, user_id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtGuard)
  @Get('count/:post_id')
  async getLikeCount(@Param('post_id') post_id: string) {
    try {
      const count = await this.likesService.getPostLikesCount(post_id);
      return { post_id, likeCount: count };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @UseGuards(JwtGuard)
  @Get('status/:post_id/:user_id')
  async hasUserLiked(@Param('post_id') post_id: string, @Param('user_id') user_id: string) {
    try {
      const liked = await this.likesService.hasUserLiked(post_id, user_id);
      return { post_id, user_id, liked };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

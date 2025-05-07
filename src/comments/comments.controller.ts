import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/users.decorators';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtGuard)
  @Post(':post_id')
  async addComment(
    @Param('post_id') post_id: string,
    @Body() dto: CreateCommentDto,
    @CurrentUser() user: any,
  ) {
    try {
      const user_id = user.id;
      return await this.commentsService.addComment(post_id, user_id, dto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':post_id')
  async getComments(@Param('post_id') post_id: string) {
    try {
      return await this.commentsService.getCommentsByPost(post_id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtGuard)
  @Delete(':comment_id')
  async deleteComment(
    @Param('comment_id') comment_id: string,
    @CurrentUser() user: any,
  ) {
    try {
      const user_id = user.id;
      return await this.commentsService.deleteComment(comment_id, user_id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

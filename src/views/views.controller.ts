import {
  Controller,
  Get,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ViewsService } from './views.service';
import { CreateViewDto } from './dto/create-view.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/users.decorators';

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}
  @UseGuards(JwtGuard)
  @Get('post/:id')
  async addView(@Param('id') post_id: CreateViewDto, @CurrentUser() user: any) {
    try {
      const user_id = user.id;
      return await this.viewsService.addView(post_id, user_id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @UseGuards(JwtGuard)
  @Get('post/:id/views')
  async getPostViews(@Param('id') post_id: string) {
    try {
      return await this.viewsService.getPosCountViews(post_id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

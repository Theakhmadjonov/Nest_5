import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ViewsModule } from './views/views.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { AuthModule } from './auth/auth.module';
import { CoreMOdule } from './modules/core/core.module';

@Module({
  imports: [UsersModule, PostsModule, ViewsModule, CommentsModule, LikesModule, AuthModule, CoreMOdule],
  controllers: [],
  providers: [],
})
export class AppModule {}

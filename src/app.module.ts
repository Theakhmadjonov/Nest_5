import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ViewsModule } from './views/views.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, PostsModule, ViewsModule, CommentsModule, LikesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

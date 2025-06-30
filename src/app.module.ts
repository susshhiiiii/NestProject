import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/social-media'),
            UserModule, ProfileModule, PostModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

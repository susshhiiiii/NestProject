import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { ActivityModule } from './modules/activity/activity.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/social-media'),
            UserModule, ProfileModule, PostModule, CommentModule, AuthModule,ActivityModule],
  controllers: [],
  providers: [
    // JwtService,
    // {
    //   provide: APP_GUARD,
    //   useClass:AuthGuard
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass:RoleGuard
    // }
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/social-media'),UserModule, ProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

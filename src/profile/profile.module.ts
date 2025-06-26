import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from 'src/schema/profile.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[MongooseModule.forFeature([{name:Profile.name,schema:ProfileSchema}]),UserModule],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}

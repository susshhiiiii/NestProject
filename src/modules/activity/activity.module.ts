import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UpdatedActivitySchema, ActivityModel } from './activity-Schema';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: UpdatedActivitySchema.name, schema: ActivityModel }])],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService]
})
export class ActivityModule { }

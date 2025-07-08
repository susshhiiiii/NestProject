import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityModel, ActivitySchema } from '../../schema/activity-Schema';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: ActivitySchema.name, schema: ActivityModel }])],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService]
})
export class ActivityModule { }

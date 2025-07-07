/**
 *  Service responsible for logging user activities to the database
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActitvityDocument, UpdatedActivitySchema } from './activity-Schema';
import { UpdateActivityDto } from './dto/update.dto';
import { UpdateActivityResponseDto } from './dto/updateResponse';

@Injectable()

export class ActivityService {

    constructor(@InjectModel(UpdatedActivitySchema.name) private activityModel: Model<ActitvityDocument>) { }
    async logActivity(prevData:any,newData:any,udatedAt?:Date) {
        console.log(prevData,newData,udatedAt)  
    }


    async getAllActivities() {
        return this.activityModel.find().sort({ createdAt: -1 }).exec(); 
    }

}

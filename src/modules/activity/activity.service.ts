/**
 *  Service responsible for logging user activities to the database
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ActitvityDocument, ActivitySchema } from '../../schema/activity-Schema';
import { ToUpdateActivityResponse } from './helper/conversionActivity.helper';

@Injectable()

export class ActivityService {

    constructor(@InjectModel(ActivitySchema.name) private activityModel: Model<ActitvityDocument>) { }
    async logActivity(
        userId: Types.ObjectId,
        prevData: any,
        newData: any,
    ) {

        new this.activityModel({
            userID: userId,
            action: "Update",
            description: "Update an Entry",
            previousData: prevData,
            updatedData: newData,
        }).save()

    }


    async getAllActivities() {
        return (await this.activityModel.find()).map((item) => ToUpdateActivityResponse(item))             
    }

}

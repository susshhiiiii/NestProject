/**
 *  Service responsible for logging user activities to the database
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActitvityDocument, Activity } from './activity-Schema';

@Injectable()

export class ActivityService {

    constructor(@InjectModel(Activity.name) private activityModel: Model<ActitvityDocument>) { }

    async logActivity(params: {        
        action: string;
        resource: string;
        description?: string;
        payload?: any;
    }) {
        const {  action, resource, description, payload } = params;
        return this.activityModel.create({
            
            action,
            resource,
            description,
            payload,
        });
    }


    async getAllActivities() {
        return this.activityModel.find().sort({ createdAt: -1 }).exec(); // optional: latest first
    }

}

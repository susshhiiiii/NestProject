/**
 * Schema for Activities
 */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
export type ActitvityDocument = ActivitySchema & Document;
@Schema({ timestamps: true })
export class ActivitySchema {
    
    @Prop()
    userID: Types.ObjectId
    
    //update
    @Prop()
    action: string;

    @Prop()
    //Updated the data
    description: string;

    @Prop()
    previousData?: [];
    
    @Prop()
    updatedData?: []
    
   
}
export const ActivityModel = SchemaFactory.createForClass(ActivitySchema);
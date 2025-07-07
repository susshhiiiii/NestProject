/**
 * Schema for Activities
 */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
export type ActitvityDocument = UpdatedActivitySchema & Document;
@Schema({ timestamps: true })
export class UpdatedActivitySchema {
    
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
    
    @Prop()
    updatedAt?:Date

}
export const ActivityModel = SchemaFactory.createForClass(UpdatedActivitySchema);
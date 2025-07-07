/**
 * Schema for Activities
 */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type ActitvityDocument = Activity & Document;
@Schema({ timestamps: true })
export class Activity {


    @Prop()
    action: string;

    @Prop()
    resource: string;

    @Prop()
    description: string;

    @Prop({ type: Object })
    payload?: any;

}
export const ActivityModel = SchemaFactory.createForClass(Activity);
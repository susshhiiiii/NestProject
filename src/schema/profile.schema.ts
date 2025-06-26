import { Prop, Schema } from "@nestjs/mongoose";
import { EnumAllowedTypes } from "@nestjs/swagger/dist/interfaces/schema-object-metadata.interface";
import { Types } from "mongoose";

@Schema()
export class ProfileSchema{
    @Prop({ required: true })
    username: string
    
    @Prop({ required: true })
    phoneNumber: string
    
    @Prop({ required: false })
    bio?: string
    
    //Connected Field
    @Prop({type:Types.ObjectId,})
}
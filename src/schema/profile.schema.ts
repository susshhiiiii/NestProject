import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { TimestampedDocument } from "src/helper/conversion.helper";

@Schema({timestamps:true})
export class Profile {
        @Prop({ required: true })
        username: string
        
        @Prop({ required: true })
        phoneNumber: string
        
        @Prop({ required: false })
        bio?: string
        
        //Connected Field
        @Prop({ type: Types.ObjectId, ref: 'User', required: true })
        user: Types.ObjectId

        @Prop({ type: Types.ObjectId, ref: 'Post', require: false })
        post?: Types.ObjectId   

        @Prop()
        createdAt?: Date
        
        @Prop()
        updatedAt?:Date
}

const ProfileSchema = SchemaFactory.createForClass(Profile)
type ProfileDocument = Document & Profile 
export { ProfileDocument, ProfileSchema }
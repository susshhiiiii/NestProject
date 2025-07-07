import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Timestamp } from "rxjs";
import { TimestampedDocument } from "src/helper/conversion.helper";

@Schema({timestamps:true})
export class Post {
    @Prop({ required: true })
    tweet: string

    @Prop({required:false})
    image?: string

    //Related Fields
    @Prop({ type: Types.ObjectId, required: true, ref: 'Profile' })
    profile: Types.ObjectId

    @Prop({ type: Types.ObjectId, required: false, ref: 'Comment' })
    comment?: Types.ObjectId

    @Prop()
    createdAt?: Date 
    
    @Prop()
    updatedAt?:Date
}

const PostSchema = SchemaFactory.createForClass(Post)
type PostDocument = Post & Document 
export { PostDocument, PostSchema }
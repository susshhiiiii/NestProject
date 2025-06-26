import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class Post {
    @Prop({ required: true })

    tweet: string

    @Prop({ required: true })
    createdOn: Date

    //Related Fields
    @Prop({ type: Types.ObjectId, required: true, ref: 'Profile' })
    profile: Types.ObjectId

    @Prop({ type: Types.ObjectId, required: false, ref: 'Comment' })
    comment?: Types.ObjectId

}

const PostSchema = SchemaFactory.createForClass(Post)
type PostDocument = Post & Document
export { PostDocument, PostSchema }
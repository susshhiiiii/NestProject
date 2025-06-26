import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class Comment {
    @Prop({ required: true })
    message: string

    //Related Fields        
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    createdBy: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
    post: Types.ObjectId
}

const CommentSchema = SchemaFactory.createForClass(Comment)
type CommentDocument = Document & Comment

export { CommentDocument, CommentSchema }
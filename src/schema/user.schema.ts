import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";


interface TimestampedDocument {
  createdAt: Date;
  updatedAt: Date;
}

@Schema({timestamps:true})
export class User {

    @Prop({ required: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop({ required: false })
    createdBy?: Types.ObjectId

    // @Prop({ required: false })
    // createdOn?: Date

    //Connected Fields
    @Prop({ type: Types.ObjectId, ref: 'Profile', required: false })
    profile?: Types.ObjectId
}
const UserSchema = SchemaFactory.createForClass(User)
type UserDocument = User & Document &TimestampedDocument

export { UserSchema, UserDocument }
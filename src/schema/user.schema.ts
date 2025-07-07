import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Role } from "src/enums/role.enum";
import { TimestampedDocument } from "src/helper/conversion.helper";




@Schema({timestamps:true})
export class User {

  @Prop({ required: true })  
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ required: false })  
  createdBy?: Types.ObjectId

  @Prop({ required: true })
  roles:Role[]
  
  //Connected Fields
  @Prop({ type: Types.ObjectId, ref: 'Profile', required: false })
  profile?: Types.ObjectId
  
  @Prop()
  createdAt?: Date 
  
  @Prop()
  updatedAt?:Date
}
const UserSchema = SchemaFactory.createForClass(User)
type UserDocument = User & Document 

export { UserSchema, UserDocument }
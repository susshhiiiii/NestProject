import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Role } from "src/enums/role.enum";

@Schema({ timestamps: true })
export class User {

  @Prop({ required: true })  
  email: string

  @Prop({ required: true })
  password: string

  @Prop({default:false})
  isVerified:boolean

  @Prop({ required: false })
  otp?: string
  
  @Prop({ required: false })
  otpGenerateTime?:Date

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
  updatedAt?: Date    

}
const UserSchema = SchemaFactory.createForClass(User)
type UserDocument = User & Document 

export { UserSchema, UserDocument }
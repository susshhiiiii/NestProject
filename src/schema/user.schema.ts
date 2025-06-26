import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class UserSchema{
    @Prop({isRequired:true,type})

}
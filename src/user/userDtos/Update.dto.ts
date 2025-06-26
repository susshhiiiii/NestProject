import { ApiProperty } from "@nestjs/swagger"
import { isNotEmpty, IsNotEmpty } from "class-validator"
import { Types } from "mongoose"

export class UpdateUserDto{
    @ApiProperty()
    @IsNotEmpty()
    id:Types.ObjectId

    @ApiProperty()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    password:string 
}
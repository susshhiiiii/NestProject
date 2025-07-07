import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { Types } from "mongoose"
import { Role } from "src/enums/role.enum"

export class UpdateUserDto{
    @ApiProperty()
    @IsNotEmpty()
    id:Types.ObjectId

    @ApiProperty()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    password: string 
    
    @ApiProperty()
    @IsNotEmpty()
    roles:Role[]
}
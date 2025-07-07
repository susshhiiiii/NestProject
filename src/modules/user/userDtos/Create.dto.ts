import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { Role } from "src/enums/role.enum"

export class CreateUserDto{
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
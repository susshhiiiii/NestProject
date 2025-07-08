import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, isNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class CreateProfileDto{
    @ApiProperty()
    @IsNotEmpty()
    username: string
    
    @ApiProperty()
    @IsNotEmpty()
    phoneNumber: string

    @ApiPropertyOptional()        
    bio?: string

    
    
}
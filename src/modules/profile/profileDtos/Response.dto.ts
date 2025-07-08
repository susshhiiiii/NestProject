import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { isNotEmpty, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class ProfileResponse{
    @ApiProperty()
    @IsNotEmpty()
    username: string
    
    @ApiProperty()
    @IsNotEmpty()
    phoneNumber: string

    @ApiPropertyOptional()
    bio?: string | null
    
    @ApiProperty()
    @IsNotEmpty()
    user: Types.ObjectId
    
    @ApiPropertyOptional()
    post?: Types.ObjectId[] | null
    
    @ApiPropertyOptional()
    createdOn?: Date | null
    
    @ApiPropertyOptional()
    updatedOn?:Date|null
    
}

   
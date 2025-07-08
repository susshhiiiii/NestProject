import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class ActivityResponseDto {
    
    @ApiProperty()
    userID: Types.ObjectId
    
    //update
    @ApiProperty()
    @IsNotEmpty()
    action: string;

    @ApiProperty()
    @IsNotEmpty()
    //Updated the data
    description: string;

    @ApiPropertyOptional()
    previousData?: [];
    
    @ApiPropertyOptional()
    updatedData?: []
    
    @ApiPropertyOptional()
    updatedAt?: Date
    
}
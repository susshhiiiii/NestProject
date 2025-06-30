import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty} from "class-validator";
import { Types } from "mongoose";

export class UserResponse{
    @ApiProperty()
    @IsNotEmpty()
    email: string
    
    @ApiPropertyOptional()
    createdBy?: Types.ObjectId|null|string
    
    @ApiPropertyOptional()
    createdOn?: Date|null
    
    @ApiPropertyOptional()
    profile?:Types.ObjectId|null
}
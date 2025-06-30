import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { isNotEmpty, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class CreatePostDto{

    @ApiProperty()
    @IsNotEmpty()
    tweet: string

    @ApiProperty()
    @IsNotEmpty()
    profile: Types.ObjectId
    
    @ApiPropertyOptional()
    comment?:Types.ObjectId
}
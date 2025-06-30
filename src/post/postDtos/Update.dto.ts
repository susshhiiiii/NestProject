import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { Types } from "mongoose"

export class UpdatePostDto{
    @ApiProperty()
    @IsNotEmpty()
    id:string

    @ApiProperty()
    @IsNotEmpty()
    tweet: string

    @ApiProperty()
    @IsNotEmpty()
    profile: Types.ObjectId
    
    @ApiPropertyOptional()
    image?: string

    @ApiPropertyOptional()
    comment?:Types.ObjectId
}
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { Types } from "mongoose"

export class PostResponse {
    @ApiProperty()
    @IsNotEmpty()
    tweet: string

    @ApiPropertyOptional()
    image?: string|null

    @ApiProperty()
    @IsNotEmpty()
    profile: Types.ObjectId
    
    @ApiPropertyOptional()
    comment?: Types.ObjectId | null
    
    @ApiPropertyOptional()
    createdOn?: Date | null
    
    @ApiPropertyOptional()
    updatedOn?: Date | null    
    
}

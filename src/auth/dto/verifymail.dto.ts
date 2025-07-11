import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class VerifyMailDto{
    @ApiProperty()
    @IsNotEmpty()
    email: string    
}
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class VerifyMail{
    
    @ApiProperty()
    @IsNotEmpty()
    email:string

    
}
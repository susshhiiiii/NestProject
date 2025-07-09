import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginViaOtpDto{
    @ApiProperty()
    @IsNotEmpty()
    email: string
    
    @ApiPropertyOptional()
    otp?:string
}
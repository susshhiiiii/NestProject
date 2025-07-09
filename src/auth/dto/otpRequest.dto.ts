import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class OtpRequestDto{
    @ApiProperty()
    @IsNotEmpty()
    email: string
}
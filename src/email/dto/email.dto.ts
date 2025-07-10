import { IsArray, IsOptional, IsString } from "class-validator";

export class EmailDto{
    @IsArray()    
    recipients: string[]
    
    @IsString()
    subject: string
   

    @IsOptional()
    text?:string
}
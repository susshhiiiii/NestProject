import { ApiPropertyOptional } from "@nestjs/swagger";

export class DateRequest{
    @ApiPropertyOptional()
    startDate?: Date
    
    @ApiPropertyOptional()
    endDate?:Date
}
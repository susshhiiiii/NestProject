/**
 * Controller to Fetch all the Logs saved in Database
 */
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ErrorLogService } from './error-log.service';
import { Public } from 'src/auth/decorators/auth.decorator';
import { DateRequest } from './dto/date-request.dto';
@Public()
@Controller('error-log')
export class ErrorLogController {
    constructor(private logService: ErrorLogService) { }
  
    @Get()
    getAllLogs(@Body() dateRequest: DateRequest) {        
        return this.logService.GetErroLog(dateRequest)
    }
}

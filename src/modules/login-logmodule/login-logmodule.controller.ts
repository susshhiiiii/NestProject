import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginLogService } from './login-logmodule.service';
import { Public } from 'src/auth/decorators/auth.decorator';

@Controller('login-logmodule')
export class LoginLogmoduleController {
    constructor(private readonly loginService: LoginLogService) { }
    @Get()
    @Public()
    @ApiOperation({ summary: 'Get all activity logs' })
    @ApiResponse({
        status: 200,
        description: 'List of all user activities',

    })
    async getAllActivities() {
        return this.loginService.getAllActivities();
    }
}


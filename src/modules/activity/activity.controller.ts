import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { ActivityService } from './activity.service';

@Controller('activities')

export class ActivityController {
    constructor(private readonly activityService: ActivityService) { }

    @Get()
    @ApiOperation({ summary: 'Get all updated activity logs' })
    @ApiResponse({
        status: 200,
        description: 'List of all user updated activities',

    })
    async getAllActivities() {
        return this.activityService.getAllActivities();
    }
}

import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateProfileDto } from './profileDtos/Create.dto';
import { UpdateProfileDto } from './profileDtos/Update.dto';
import { Request } from 'express';

@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) { }
    
    //Admin
    @Get()
    @ApiOperation({ summary: 'Api endpoint to get All Profiles' })
    async GetAllProfiles() {
        return await this.profileService.GetProfiles()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Api endpoint to get Profile with the provided id' })
    async GetProfile(@Param('id') id: string, @Req() req: Request) {
        const userId=req['user'].sub
        return await this.profileService.GetProfile(id,userId)
    }

    @Post()
    @ApiOperation({summary:'Api endpoint to Create a profile for the user'})    
    async CreateProfile(@Body() createProfileRequest: CreateProfileDto, @Req() request: Request) {
        const userId=request['user'].sub
        return await this.profileService.CreateProfile(createProfileRequest,userId)
    }

    @Put()
    @ApiOperation({summary:'Api endpoint to update a profile of the user'})
    async UpdateProfile(@Body() UpdateProfileDto: UpdateProfileDto, @Req() request: Request) {
        const userId=request['user'].sub
        return await this.profileService.UpdateProfile(UpdateProfileDto,userId)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Api endpoint to delete a profile of the user' })
    async DeleteProfile(@Param('id') id: string, @Req() req: Request) {
        const userId=req['user'].sub
        return await this.profileService.DeleteProfile(id,userId)
    }
}

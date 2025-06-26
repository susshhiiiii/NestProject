import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateProfileDto } from './profileDtos/Create.dto';
import { UpdateProfileDto } from './profileDtos/Update.dto';
import { appendFile } from 'fs';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) { }
    
    @Get()
    @ApiOperation({ summary: 'Api endpoint to get All Profiles' })
    async GetAllProfiles() {
        return await this.profileService.GetProfiles()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Api endpoint to get Profile with the provided id' })
    async GetProfile(@Param('id')id:string) {
        return await this.profileService.GetProfile(id)
    }

    @Post()
    @ApiOperation({summary:'Api endpoint to Create a profile for the user'})    
    async CreateProfile(@Body()createProfileRequest:CreateProfileDto) {
        return await this.profileService.CreateProfile(createProfileRequest)
    }

    @Put()
    @ApiOperation({summary:'Api endpoint to update a profile of the user'})
    async UpdateProfile(@Body() UpdateProfileDto: UpdateProfileDto) {
        return await this.profileService.UpdateProfile(UpdateProfileDto)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Api endpoint to delete a profile of the user' })
    async DeleteProfile(@Param('id')id:string) {
        return await this.DeleteProfile(id)
    }
}

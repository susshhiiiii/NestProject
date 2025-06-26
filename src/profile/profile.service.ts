import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from 'src/schema/profile.schema';
import { ProfileResponse } from './profileDtos/Response.dto';
import { ToProfileResponse } from 'src/helper/conversion.helper';
import { CreateProfileDto } from './profileDtos/Create.dto';
import { UserService } from 'src/user/user.service';
import { UpdateProfileDto } from './profileDtos/Update.dto';

@Injectable()
export class ProfileService {
    constructor(@InjectModel(Profile.name) private profileModel: Model<Profile>,private userService:UserService) { }
    async GetProfiles():Promise<ProfileResponse[]> {
        const response = await this.profileModel.find().populate('user').exec()
        return response.map((i)=>ToProfileResponse(i))
    }

    async GetProfile(id:string): Promise<ProfileResponse>{
        const response = await this.profileModel.findById(id).populate('user').exec()

        if(!response)throw new BadRequestException('No id present')
        return ToProfileResponse(response);    
    }

    async DeleteProfile(id: string): Promise<string>{
        const response = await this.profileModel.findByIdAndDelete(id).exec()
        if (!response) throw new BadRequestException('No Profile with the given id is present')
        return 'Profile is Deleted'
    }

    async CreateProfile(createRequest: CreateProfileDto): Promise<ProfileResponse>{
        const user = await this.userService.GetUser(createRequest.user.toString())
        if (!user) throw new BadRequestException('No user is associated with this id')
        
        const profile = new this.profileModel(createRequest)
        profile.save()

        return ToProfileResponse(profile)
    }

    async UpdateProfile(updateRequest: UpdateProfileDto): Promise<ProfileResponse>{
        const user = await this.userService.GetUser(updateRequest.user.toString())
        if (!user) throw new BadRequestException('No user is associated with this id') 
        
        const profile = await this.profileModel.
            findByIdAndUpdate(updateRequest.id, updateRequest, { new: true }).populate('user').exec()

        if(!profile)throw new BadRequestException('Couldnot Update the selected profile')
        return ToProfileResponse(profile)
    }
}

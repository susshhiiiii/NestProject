import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Profile } from 'src/schema/profile.schema';
import { ProfileResponse } from './profileDtos/Response.dto';
import { ToProfileResponse } from 'src/helper/conversion.helper';
import { CreateProfileDto } from './profileDtos/Create.dto';
import { UserService } from 'src/modules/user/user.service';
import { UpdateProfileDto } from './profileDtos/Update.dto';
import { User } from 'src/schema/user.schema';
import { create } from 'domain';

@Injectable()
export class ProfileService {
    constructor(@InjectModel(Profile.name) private profileModel: Model<Profile>,
        @InjectModel(User.name)private userModel:Model<User>,
        private userService: UserService
    ) { }
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

    async CreateProfile(createRequest: CreateProfileDto,userId:Types.ObjectId): Promise<ProfileResponse>{
        const user = await this.userService.GetUser(userId.toString())
        if (!user) throw new BadRequestException('No user is associated with this id')
        
        const profile = new this.profileModel({...createRequest,user:userId})
        await profile.save()

        if (user.profile)
            throw new BadRequestException('Profile for particular user already exists')

        const result = await this.userModel.updateOne(
        { _id: userId },
        { $set: { profile: profile._id } }
        );       

        return ToProfileResponse(profile)
    }

    async UpdateProfile(updateRequest: UpdateProfileDto,userId:Types.ObjectId): Promise<ProfileResponse>{
        const user = await this.userService.GetUser(userId.toString())
        if (!user) throw new BadRequestException('No user is associated with this id') 
        
        const profile = await this.profileModel.
            findByIdAndUpdate(updateRequest.id, {...updateRequest,user:userId}, { new: true }).populate('user').exec()

        if(!profile)throw new BadRequestException('Couldnot Update the selected profile')
        return ToProfileResponse(profile)
    }
}

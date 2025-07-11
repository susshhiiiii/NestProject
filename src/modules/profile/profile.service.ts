import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Profile } from 'src/schema/profile.schema';
import { ProfileResponse } from './profileDtos/Response.dto';
import { ToProfileResponse } from 'src/helper/conversion.helper';
import { CreateProfileDto } from './profileDtos/Create.dto';
import { UserService } from 'src/modules/user/user.service';
import { UpdateProfileDto } from './profileDtos/Update.dto';
import { User } from 'src/schema/user.schema';

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

    async GetProfile(id:string,userId:Types.ObjectId): Promise<ProfileResponse>{
        const response = await this.profileModel.findById(id).populate('user').exec()
        
        if(!response)throw new BadRequestException('No id present')
        if(response.user && response.user==userId)
            return ToProfileResponse(response);
        
        throw new UnauthorizedException('Cannot access this Profile')
    }

    async DeleteProfile(id: string,userId:Types.ObjectId): Promise<string>{
        
        const response = await this.profileModel.findById(id)        
        
        if (!response) throw new BadRequestException('No Profile with the given id is present')
        
        if (response && response.user == userId) {
            if (await this.userModel.findByIdAndDelete(id)) {
                return 'Profile is Deleted'                
            }
            
        }
        
        throw new UnauthorizedException('Cannot delete this profile')
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

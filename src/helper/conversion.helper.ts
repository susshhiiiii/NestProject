import { ProfileResponse } from "src/profile/profileDtos/Response.dto";
import { Profile } from "src/schema/profile.schema";
import { User } from "src/schema/user.schema";
import { UserResponse } from "src/user/userDtos/Response.dto";

function ToUserResponse(userData:User):UserResponse {
    const response: UserResponse = {
        email: userData.email??null,
        createdBy: userData.createdBy??null,
        createdOn: userData.createdOn??null,
        profile:userData.profile??null
    }
    return response
}

function ToProfileResponse(profileData: Profile): ProfileResponse{
    const response: ProfileResponse = {
        username: profileData.username,
        phoneNumber: profileData.phoneNumber,
        bio: profileData.bio??null,
        user: profileData.user,
        post:profileData.post??null
    }
    return response 
}

export {ToUserResponse,ToProfileResponse}


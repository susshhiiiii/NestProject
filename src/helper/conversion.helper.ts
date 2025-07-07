import { PostResponse } from "src/modules/post/postDtos/Response.dto";
import { ProfileResponse } from "src/modules/profile/profileDtos/Response.dto";
import { Post, PostDocument } from "src/schema/post.schema";
import { Profile, ProfileDocument } from "src/schema/profile.schema";
import { User, UserDocument } from "src/schema/user.schema";
import { UserResponse } from "src/modules/user/userDtos/Response.dto";

function ToUserResponse(userData:UserDocument):UserResponse {
    const response: UserResponse = {
        email: userData.email??null,
        createdBy: userData.createdBy??'Sushant',
        createdOn: userData.createdAt ?? null,
        roles:userData.roles,
        updatedOn:userData.updatedAt?? null,
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
        post: profileData.post ?? null,
    }
    return response 
}

function ToPostResponse(postData: Post): PostResponse{
    const response: PostResponse = {
        tweet: postData.tweet,
        image: postData.image??null,
        profile: postData.profile,
        comment: postData.comment ?? null,
        createdOn: postData.createdAt,
        updatedOn:postData.updatedAt
    }
    return response
}

interface TimestampedDocument {
  createdAt: Date;
  updatedAt: Date;
}
export {TimestampedDocument,ToUserResponse,ToProfileResponse,ToPostResponse}

//add commit push   
import { BadRequestException, Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/schema/post.schema';
import { CreatePostDto } from './postDtos/Create.dto';
import { PostResponse } from './postDtos/Response.dto';
import { ToPostResponse } from 'src/helper/conversion.helper';
import { UpdatePostDto } from './postDtos/Update.dto';
import { Response} from 'express'
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class PostService {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) { }
    async CreatePost(createPostRequest: CreatePostDto,imagePath:string): Promise<PostResponse>{
        const post = new this.postModel({image:imagePath,...CreatePostDto})
        await post.save()
        return ToPostResponse(post)
    }

    async GetAllPost():Promise<PostResponse[]> {
        const response: Post[] = await this.postModel.find().exec()
        return response.map((i)=>ToPostResponse(i))
    }

    async GetPost(id: string): Promise<PostResponse>{
        const response = await this.postModel.findById(id).exec()
        if (!response)
            throw new BadRequestException('No Post with the given id is present')
        return ToPostResponse(response)
    }

    async UpdatePost(updatePostRequest:UpdatePostDto,newImagePath:string): Promise<PostResponse>{
        const response = {...updatePostRequest,image:newImagePath}
        const res = await this.postModel.
            findByIdAndUpdate(updatePostRequest.id, response, { new: true }).exec()
        
        if (!response)
            throw new BadRequestException('Cannot update value of post due to some invalid value entered')

        return ToPostResponse(response)
    }

    async DeletePost(id: string): Promise<string>{
        const post = await this.postModel.findByIdAndDelete(id).exec()
        if (!post)
            throw new BadRequestException('No post with the given id is present')

        return 'Post is deleted'

    }

    async GetImage(id: string,@Res()res:Response )  {
        const image = await this.postModel.findById(id).exec()                
        if (!image)
            throw new BadRequestException('No image for the post id is present')

        if (!image.image)
            throw new BadRequestException('No image is present on post with the provided id')

        const imagePath = path.join(__dirname, '../../', image.image)
        if (!fs.existsSync(imagePath)) {
            throw new NotFoundException('File does not exist on disk');
        }
        return res.sendFile(imagePath)
    }
}

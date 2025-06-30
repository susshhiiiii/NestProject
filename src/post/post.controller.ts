import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreatePostDto } from './postDtos/Create.dto';
import { PostService } from './post.service';
import { UpdatePostDto } from './postDtos/Update.dto';
import {Response} from 'express'
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService){}
    @Post()
    @UseInterceptors(
    FileInterceptor('image', {
        storage: diskStorage({
        destination: './postImages',
        filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e7);
            const ext = extname(file.originalname); 
            callback(null, `post-${uniqueSuffix}${ext}`);
        },
        }),
    }),
    )
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Endpoint to create a Post for userprofile' })
    @ApiBody({
    description: 'Post form with image upload',
    schema: {
        type: 'object',
        properties: {
        tweet: { type: 'string' },
        profile: { type: 'string' },
        comment: { type: 'string' },
        image: {
            type: 'string',
            format: 'binary',
        },
        },
    },
    })
    createPost(
    @Body() createPostRequest: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
    ) {
    const imagePath = `./postImages/${file.filename}`;
    return this.postService.CreatePost(createPostRequest, imagePath);
    }

    @Get()
    @ApiOperation({ summary: 'Api endpoint to get all the Posts' })
    GetAllPost() {
        return this.postService.GetAllPost()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Api endpoint to get the Post with the given id' })
    GetPost(@Param('id')id:string) {
        return this.postService.GetPost(id)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Api endpoint to delete post with the given id' })
    DeletePost(@Param('id')id:string) {
        return this.postService.DeletePost(id)
    }

    @Put()
    @ApiOperation({ summary: 'Api endpoint to update the post' })
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: '../../postImages',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e7)
                    const ext = (file.originalname)
                    callback(null,`post-${uniqueSuffix}${ext}`)
                }
            })
        })
        )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                id:{type:'string'},
                tweet: { type: 'string' },
                profile: { type: 'string' },
                Comment: { type: 'string' },
                image:{type:'string',format:'binary'}
            }
        }
    })
    UpdatePost(@Body() updateRequest: UpdatePostDto, @UploadedFile() file: Express.Multer.File) {
        const imagePath = `./postImages/${file.filename}`;
        return this.postService.UpdatePost(updateRequest, imagePath)        
    }

    @Get('image/:id')
    @ApiOperation({ summary: 'Api Endpoint to get the image' })
    GetImage(@Param('id')id:string,@Res() res:Response) {
        return this.postService.GetImage(id,res)
    }    
}

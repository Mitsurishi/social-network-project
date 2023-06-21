import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPostDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Post as PostModel } from 'src/models/post.model';

@Controller('post')
export class PostController {

    constructor(private postService: PostService) { }

    @Post('/create')
    @UseInterceptors(FileInterceptor('file'))
    async createPost(@UploadedFile() file: Express.Multer.File, @Body() createPostdto: CreatePostDto): Promise<PostModel> {

        const postPicture = file;
        return this.postService.createPost(postPicture, createPostdto);

    }

    @Get('/posts')
    async getFeedPosts(): Promise<PostModel[]> {

        return this.postService.getFeedPosts();

    }

    @Get('/:userId/posts')
    async getUserPosts(@Param('userId') userId: number): Promise<PostModel[]> {

        return this.postService.getUserPosts(userId);

    }

    @Patch('/:id/like')
    async likeUnlikePost(@Param('id') id: number, @Body() userId: string): Promise<[affectedCount: number]> {

        return this.postService.likeUnlikePost(id, userId);

    }

}

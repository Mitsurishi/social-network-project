import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPostDto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {

    constructor(private postService: PostService) { }

    @Post('/create')
    @UseInterceptors(FileInterceptor('file'))
    async createPost(@UploadedFile() file: Express.Multer.File, @Body() createPostdto: CreatePostDto) {

        const postPicture = file;
        return this.postService.createPost(postPicture, createPostdto);

    }

    @Get('/posts')
    async getFeedPosts() {

        return this.postService.getFeedPosts();

    }

    @Get('/:userId/posts')
    async getUserPosts(@Param('userId') userId: number) {

        return this.postService.getUserPosts(userId);

    }

    @Patch('/:id/like')
    async likeUnlikePost(@Param('id') id: number, @Body() userId: string) {

        return this.postService.likeUnlikePost(id, userId);

    }

}

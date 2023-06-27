import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPostDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Post as PostModel } from 'src/models/post.model';
import { JwtAccessGuard } from 'src/auth/guards/jwt-auth.guard';
import { LikeUnlikeDto } from './dto/likeUnlikeDto';

@UseGuards(JwtAccessGuard)
@Controller('post')
export class PostController {

    constructor(private postService: PostService) { }

    @Post('/create')
    @UseInterceptors(FileInterceptor('file'))
    async createPost(@Body() createPostDto: CreatePostDto, @UploadedFile() file?: Express.Multer.File): Promise<PostModel> {

        const postPicture = file
        return this.postService.createPost(createPostDto, postPicture);

    }

    @Get('/posts')
    async getFeedPosts(): Promise<PostModel[]> {

        return this.postService.getFeedPosts();

    }

    @Get('/:userId/posts')
    async getUserPosts(@Param('userId') userId: number): Promise<PostModel[]> {

        return this.postService.getUserPosts(userId);

    }

    @Put('/:id/like')
    async likeUnlikePost(@Param('id') id: number, @Body() likeUnlikeDto: LikeUnlikeDto): Promise<PostModel> {

        return this.postService.likeUnlikePost(id, likeUnlikeDto);

    }

    @Delete('/:postId/delete')
    async deletePost(@Param('postId') postId: number): Promise<number> {

        return this.postService.deletePost(postId);

    }

}

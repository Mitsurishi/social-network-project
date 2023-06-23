import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FileService, FileType } from 'src/file/file.service';
import { CreatePostDto } from './dto/createPostDto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { Post } from 'src/models/post.model';

@Injectable()
export class PostService {

    constructor(

        @InjectModel(Post) private postRepository: typeof Post,
        @InjectModel(User) private userRepository: typeof User,
        private fileService: FileService,

    ) { }

    async createPost(createPostDto: CreatePostDto, postPicture?) {

        try {
            const user = await this.userRepository.findByPk(createPostDto.userId)
            if (postPicture) {
                const postPicturePath = this.fileService.createFile(FileType.IMAGE, postPicture);
                const post = await this.postRepository.create(
                    {
                        ...createPostDto,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userPicturePath: user.profilePicturePath,
                        postPicturePath: postPicturePath
                    }
                )
                return post
            }
            const post = await this.postRepository.create(
                {
                    ...createPostDto,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userPicturePath: user.profilePicturePath,
                }
            )
            return post
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }

    }

    async getFeedPosts() {

        try {
            return this.postRepository.findAll();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }

    }

    async getUserPosts(userId: number) {

        try {
            return this.postRepository.findAll({ where: { userId: userId } });
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }

    }

    async likeUnlikePost(postId: number, userId) {

        try {
            userId = userId.userId
            const post = await this.postRepository.findByPk(postId)
            const isLiked = post.likes.includes(userId)
            if (isLiked) {
                post.likes = post.likes.filter((id) => id !== userId);
            } else {
                post.likes.push(userId);
            }
            const likes = post.likes;
            const updatedPost = await this.postRepository.update({ likes }, { where: { id: postId } });
            return updatedPost;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }

    }

}

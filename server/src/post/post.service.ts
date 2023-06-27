import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FileService, FileType } from 'src/file/file.service';
import { CreatePostDto } from './dto/createPostDto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { Post } from 'src/models/post.model';
import { LikeUnlikeDto } from './dto/likeUnlikeDto';

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
            const user = await this.userRepository.findByPk(userId);
            if (!user) {
                throw new NotFoundException;
            } else {
                return this.postRepository.findAll({ where: { userId: userId } });
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }

    }

    async likeUnlikePost(postId: number, likeUnlikeDto: LikeUnlikeDto) {

        try {
            const post = await this.postRepository.findByPk(postId, { attributes: ['likes'] });
            const isLiked = post.likes.includes(likeUnlikeDto.userId);
            if (isLiked) {
                post.likes = post.likes.filter((id) => id !== likeUnlikeDto.userId);
            } else {
                post.likes.push(likeUnlikeDto.userId);
            }
            const likes = post.likes;
            await this.postRepository.update({ likes }, { where: { id: postId } });
            const updatedPost = await this.postRepository.findByPk(postId);
            return updatedPost;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }

    }

    async deletePost(postId: number) {

        try {
            const post = await this.postRepository.destroy({ where: { id: postId } });
            return post;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}

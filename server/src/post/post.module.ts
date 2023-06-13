import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { FileService } from 'src/file/file.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { Post } from 'src/models/post.model';
import { JwtModule } from '@nestjs/jwt';

@Module({

    controllers: [PostController],
    providers: [PostService, FileService],
    imports: [
        SequelizeModule.forFeature([User, Post]),
        JwtModule,
    ],
    exports: [PostService]

})
export class PostModule { }

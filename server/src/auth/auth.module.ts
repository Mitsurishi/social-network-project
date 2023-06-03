import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { FileService } from 'src/file/file.service';
import { UserModule } from 'src/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { Post } from 'src/models/post.model';

@Module({

    controllers: [AuthController],
    providers: [AuthService, UserService, FileService],
    imports: [
        UserModule,
        SequelizeModule.forFeature([User, Post]),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY || 'SECRET',
            signOptions: {
                expiresIn: '24h'
            }
        })
    ],
    exports: [
        UserService,
        AuthService,
        JwtModule,
    ]

})
export class AuthModule { }

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FileService } from 'src/file/file.service';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';

@Module({

    controllers: [UserController],
    providers: [UserService, FileService],
    imports: [
        SequelizeModule.forFeature([User]),
        JwtModule,
    ],
    exports: [
        UserService,
    ]

})

export class UserModule { }

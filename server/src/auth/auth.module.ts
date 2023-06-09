import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { FileService } from 'src/file/file.service';
import { UserModule } from 'src/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { Post } from 'src/models/post.model';
import { MailService } from './services/mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Token } from 'src/models/token.model';
import { TokenService } from './services/token.service';
import { RefreshTokenStrategy } from './strategy/jwt-refresh.strategy';
import { JwtStrategy } from './strategy/jwt-access.strategy';

@Module({

    controllers: [AuthController],
    providers: [AuthService, UserService, FileService, MailService, TokenService, RefreshTokenStrategy, JwtStrategy],
    imports: [
        UserModule,
        SequelizeModule.forFeature([User, Post, Token]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => {
                return {
                    secret: configService.get('JWT_ACCESS_SECRET')
                }
            },
        }),
        ConfigModule,
    ],
    exports: [
        UserService,
        AuthService,
        JwtModule,
        TokenService
    ]

})
export class AuthModule { }

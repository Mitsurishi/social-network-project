import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import * as path from 'path';
import { AuthController } from './auth/auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Post } from './models/post.model';
import { Token } from './models/token.model';

@Module({

  imports: [
    ConfigModule.forRoot({}),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri: process.env.PGURI,
      models: [User, Post, Token],
      autoLoadModels: true
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    AuthModule,
    FileModule,
    UserModule,
    PostModule
  ],

  controllers: [AuthController, UserController, PostController],

})

export class AppModule { }
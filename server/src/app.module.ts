import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
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
import { MailerModule } from '@nestjs-modules/mailer';

@Module({

  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Post, Token],
      autoLoadModels: true
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: +process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        },
      },
    }),
    AuthModule,
    FileModule,
    UserModule,
    PostModule
  ],

  controllers: [AuthController, UserController, PostController],

})

export class AppModule { }
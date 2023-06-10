import { Body, Controller, Delete, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

const tokenMaxAge: number = 30 * 24 * 60 * 60 * 1000;

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/registration')
    @UseInterceptors(FileInterceptor('file'))
    async registration(@UploadedFile() file: Express.Multer.File, @Body() registrationDto: RegistrationDto, @Res({ passthrough: true }) response: Response) {

        const profilePicture = file
        const result = await this.authService.registration(registrationDto, profilePicture);
        response.cookie('refreshToken', result.tokens.refresh_token, { maxAge: tokenMaxAge, httpOnly: true });
        return result;

    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto) {

        return this.authService.login(loginDto);

    }

    @Post('/logout')
    async logout() {

        return this.authService.logout();

    }

    @Get('/activate/:link')
    async activateAccount(@Param('link') link: string) {

        return this.authService.activateAccount(link);

    }

    @Get('/refresh')
    async getTokens() {

        return this.authService.getTokens();

    }

    @Delete('/delete/:email')
    async deleteAccount(@Param('email') email: string) {

        return this.authService.deleteAccount(email);

    }


}
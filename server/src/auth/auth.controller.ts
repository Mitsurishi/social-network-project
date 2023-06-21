import { Body, Controller, Delete, Get, Param, Post, Redirect, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { ServerResponce } from './interfaces/serverResponse';

const tokenMaxAge: number = 30 * 24 * 60 * 60 * 1000;

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/registration')
    @UseInterceptors(FileInterceptor('file'))
    async registration(@UploadedFile() file: Express.Multer.File, @Body() registrationDto: RegistrationDto, @Res({ passthrough: true }) response: Response): Promise<ServerResponce> {

        const profilePicture = file
        const result = await this.authService.registration(registrationDto, profilePicture);
        response.cookie('refreshToken', result.tokens.refresh_token, { maxAge: tokenMaxAge, httpOnly: true });
        return result;

    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response): Promise<ServerResponce> {

        const result = await this.authService.login(loginDto);
        response.cookie('refreshToken', result.tokens.refresh_token, { maxAge: tokenMaxAge, httpOnly: true });
        return result;

    }

    @Get('/logout')
    async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<number> {

        const refreshToken = request.cookies.refreshToken;
        const result = await this.authService.logout(refreshToken);
        response.clearCookie('refreshToken');
        return result;

    }

    @Get('/activate/:link')
    async activateAccount(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<void> {

        const link = request.params.link;
        const activationLink = `${process.env.API_URL}/auth/activate/${link}`
        await this.authService.activateAccount(activationLink);
        return response.redirect(process.env.CLIENT_URL);

    }

    @Get('/refresh')
    async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<ServerResponce> {

        const refreshToken = request.cookies.refreshToken;
        const result = await this.authService.refresh(refreshToken);
        response.cookie('refreshToken', result.tokens.refresh_token, { maxAge: tokenMaxAge, httpOnly: true });
        return result;

    }

    @Delete('/delete/:email')
    async deleteAccount(@Param('email') email: string): Promise<number> {

        return this.authService.deleteAccount(email);

    }


}
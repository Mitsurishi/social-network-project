import { Body, Controller, Delete, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/login')
    login(@Body() loginDto: LoginDto) {

        return this.authService.login(loginDto);

    }

    @Post('/registration')
    @UseInterceptors(FileInterceptor('file'))
    registration(@UploadedFile() file: Express.Multer.File, @Body() registrationDto: RegistrationDto) {

        const profilePicture = file
        return this.authService.registration(registrationDto, profilePicture);

    }

    @Delete('/delete/:email')
    deleteAccount(@Param('email') email: string) {

        return this.authService.deleteAccount(email);

    }


}
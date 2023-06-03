import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { FileService } from 'src/file/file.service';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';

@Injectable()
export class AuthService {

    constructor(

        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private fileService: FileService,
        @InjectModel(User) private userRepository: typeof User,

    ) { }

    async registration(registrationDto: RegistrationDto, profilePicture) {

        try {
            const user = await this.userService.createUser(registrationDto, profilePicture);
            const payload = { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }
            const token = await this.generateToken(payload);
            return { payload, token };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }

    }

    async login(loginDto: LoginDto) {

        try {
            const user = await this.validateUser(loginDto);
            const payload = { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }
            return this.generateToken(payload);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }

    }

    async deleteAccount(email: string) {

        try {
            const profilePicture = await this.userRepository.findOne({ where: { email: email }, attributes: { include: ['profilePicturePath'] } })
            this.fileService.deleteFile(profilePicture.profilePicturePath);
            return this.userRepository.destroy({ where: { email: email } })
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }

    }

    private async validateUser(loginDto: LoginDto) {

        const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
        const passwordEquals = await bcrypt.compare(loginDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({ message: 'Неправильный email или пароль' })

    }

    private async generateToken(payload) {

        const token = this.jwtService.sign(payload);
        return token;

    }

}

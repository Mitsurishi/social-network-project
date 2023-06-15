import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegistrationDto } from '../dto/registration.dto';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid'
import { UserService } from '../../user/user.service';
import { FileService } from 'src/file/file.service';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { MailService } from './mail.service';
import { TokenService } from './token.service';


@Injectable()
export class AuthService {

    constructor(

        private readonly userService: UserService,
        private readonly mailService: MailService,
        private readonly tokenService: TokenService,
        private fileService: FileService,
        @InjectModel(User) private userRepository: typeof User,

    ) { }

    async registration(registrationDto: RegistrationDto, profilePicture) {

        try {
            const candidate = await this.userRepository.findOne({ where: { email: registrationDto.email } });
            if (candidate) {
                throw new HttpException(`User with email ${registrationDto.email} already exists`, HttpStatus.CONFLICT)
            }
            const activationLink = `${process.env.API_URL}/auth/activate/${uuid.v4()}`
            const user = await this.userService.createUser(registrationDto, profilePicture, activationLink);
            const payload = { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }
            const tokens = await this.tokenService.generateTokens(payload);
            await this.tokenService.saveToken(user.id, tokens.refresh_token)
            await this.mailService.sendActivationMail(registrationDto.email, activationLink)
            return { payload, tokens };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }

    }

    async login(loginDto: LoginDto) {

        try {
            const user = await this.validateUser(loginDto);
            const payload = { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }
            const tokens = await this.tokenService.generateTokens(payload);
            await this.tokenService.saveToken(user.id, tokens.refresh_token)
            return { payload, tokens }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }

    }

    async logout(refreshToken: string) {

        try {
            const token = await this.tokenService.removeToken(refreshToken);
            return token;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }

    }

    async activateAccount(link: string) {
        try {
            const user = await this.userRepository.findOne({ where: { activationLink: link } });
            if (!user) {
                throw new HttpException(`Wrong link`, HttpStatus.NOT_FOUND)
            }
            user.isActivated = true;
            await user.save();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }

    }

    async refresh(refreshToken: string) {

        try {
            if (!refreshToken) {
                throw new UnauthorizedException(HttpStatus.UNAUTHORIZED)
            }
            const result = this.tokenService.validateRefreshToken(refreshToken);
            const token = await this.tokenService.findToken(refreshToken);
            if (!result || !token) {
                throw new UnauthorizedException(HttpStatus.UNAUTHORIZED)
            }
            const user = await this.userRepository.findByPk(result.userId);
            const payload = { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }
            const tokens = await this.tokenService.generateTokens(payload);
            await this.tokenService.saveToken(user.id, tokens.refresh_token)
            return { payload, tokens }
        } catch (error) {
            throw new UnauthorizedException(HttpStatus.UNAUTHORIZED);
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

}

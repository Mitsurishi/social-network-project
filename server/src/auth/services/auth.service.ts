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
import { Token } from 'src/models/token.model';
import { TokenPayloadDto } from '../dto/token-payload.dto';
import { TokenService } from './token.service';


@Injectable()
export class AuthService {

    constructor(

        private readonly userService: UserService,
        private readonly mailService: MailService,
        private readonly tokenService: TokenService,
        private fileService: FileService,
        @InjectModel(User) private userRepository: typeof User,
        @InjectModel(Token) private tokenRepository: typeof Token,

    ) { }

    async registration(registrationDto: RegistrationDto, profilePicture) {

        try {
            const candidate = await this.userRepository.findOne({ where: { email: registrationDto.email } });
            if (candidate) {
                throw new HttpException(`User with email ${registrationDto.email} already exists`, HttpStatus.CONFLICT)
            }
            const activationLink = uuid.v4();
            const user = await this.userService.createUser(registrationDto, profilePicture, activationLink);
            await this.mailService.sendActivationMail(registrationDto.email, activationLink)
            const payload = { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }
            const tokens = await this.tokenService.generateTokens(payload);
            await this.tokenService.saveToken(user.id, tokens.refresh_token)
            return { payload, tokens };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }

    }

    async login(loginDto: LoginDto) {

        try {
            const user = await this.validateUser(loginDto);
            const payload = { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }
            return this.tokenService.generateTokens(payload);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }

    }

    async logout() { }

    async activateAccount(link: string) { }

    async getTokens() { }

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

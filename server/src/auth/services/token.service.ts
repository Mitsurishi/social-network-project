import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from 'src/models/token.model';
import { TokenPayloadDto } from '../dto/token-payload.dto';


@Injectable()
export class TokenService {

    constructor(

        private readonly jwtService: JwtService,
        @InjectModel(Token) private tokenRepository: typeof Token,

    ) { }

    async generateTokens(payload: TokenPayloadDto) {


        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '15s'
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '30d'
        });

        return { access_token: accessToken, refresh_token: refreshToken };

    }

    async saveToken(userId: number, refreshToken: string) {

        const tokenData = await this.tokenRepository.findOne({ where: { userId: userId } });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save()
        }
        const token = await this.tokenRepository.create({ userId, refreshToken });
        return token;

    }

    async removeToken(refreshToken: string) {

        const token = await this.tokenRepository.destroy({ where: { refreshToken: refreshToken } });
        return token;

    }

    async findToken(refreshToken: string) {

        const token = await this.tokenRepository.findOne({ where: { refreshToken: refreshToken } });
        return token;

    }

    validateAccessToken(accessToken: string) {

        try {
            const result = this.jwtService.verify(accessToken, { secret: process.env.JWT_ACCESS_SECRET });
            return result;
        } catch (error) {
            return null
        }

    }

    validateRefreshToken(refreshToken: string) {

        try {
            const result = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
            return result
        } catch (error) {
            return null
        }

    }

}

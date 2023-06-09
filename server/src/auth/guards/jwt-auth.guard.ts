import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAccessGuard extends AuthGuard('jwt') {

    handleRequest(err, user) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }

}

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {

    handleRequest(err, user) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }

}
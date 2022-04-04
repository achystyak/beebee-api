import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from 'src/api/users/users.type';
import { ServerError } from 'src/common/common.errors';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super()
    }

    async validate(token: string): Promise<any> {
        const user = await this.authService.jwtUser(token);
        if (!user) {
            throw ServerError.unauthorized('Wrong credentials');
        }
        return user;
    }
}
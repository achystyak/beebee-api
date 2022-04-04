import { Controller, Post, UseGuards, Request, Response, Get, Next, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ServerError } from 'src/common/common.errors';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './auth0/local.auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return req.user ? await this.authService.login(req.user) : null;
    }

    @Post('code')
    async sendCode(@Request() req) {
        const phone = req.body.phone;
        const hash = req.body.hash;
        if (phone) {
            let status = await this.authService.sendCode(phone, hash);
            if (status) {
                return status;
            }
        }
        throw ServerError.unauthorized('Auth failed');
    }

    @Post('verify')
    async verifyCode(@Request() req) {
        const phone = req.body.phone;
        const code = req.body.code;
        if (phone && code) {
            let user = await this.authService.verifyCode(phone, code);
            if (user) {
                return user;
            }
        }
        throw ServerError.unauthorized('Auth failed');
    }
}

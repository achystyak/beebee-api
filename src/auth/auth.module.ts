import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/api/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth0/jwt.strategy';
import { LocalStrategy } from './auth0/local.strategy';
import { SessionsModule } from '../api/sessions/sessions.module';
import { AbilityModule } from './ability/ability.module';
import { SmsModule } from 'src/sms/sms.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_KEY,
          // signOptions: { expiresIn: process.env.JWT_EXP },
        }
      }
    }),
    forwardRef(() => UsersModule),
    forwardRef(() => SessionsModule),
    forwardRef(() => AbilityModule),
    forwardRef(() => SmsModule),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }

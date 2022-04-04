import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/api/users/users.module';
import { Session, SessionSchema } from 'src/api/sessions/sessions.type';
import { AuthModule } from '../../auth/auth.module';
import { SessionsService } from './sessions.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  providers: [SessionsService],
  exports: [SessionsService]
})
export class SessionsModule { }

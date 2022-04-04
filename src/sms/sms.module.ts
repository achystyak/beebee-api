import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/api/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { SmsService } from './sms.service';
import { Sms, SmsSchema } from './sms.type';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sms.name, schema: SmsSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  providers: [SmsService],
  exports: [SmsService]
})
export class SmsModule { }

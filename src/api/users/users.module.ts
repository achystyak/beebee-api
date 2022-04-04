import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

import { UsersService } from './users.service';
import { User, UserSchema } from './users.type';

import { UsersController } from './users.controller';
import { CreditsModule } from '../credits/credits.module';
import { LogsModule } from '../logs/logs.module';
import { PurchasesModule } from '../purchases/purchases.module';
import { RidesModule } from '../rides/rides.module';
// Imports

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => CreditsModule),
    forwardRef(() => LogsModule),
    forwardRef(() => PurchasesModule),
    forwardRef(() => RidesModule),
    // Inject
  ],
  providers: [
    UsersService,
  ],
  controllers: [
    UsersController
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule { }

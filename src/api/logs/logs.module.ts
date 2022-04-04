import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

import { LogsService } from './logs.service';
import { Log, LogSchema } from './logs.type';

import { LogsController } from './logs.controller';
import { PurchasesModule } from '../purchases/purchases.module';
import { RidesModule } from '../rides/rides.module';
import { UsersModule } from '../users/users.module';
// Imports

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => PurchasesModule),
    forwardRef(() => RidesModule),
    forwardRef(() => UsersModule),
    // Inject
  ],
  providers: [
    LogsService,
  ],
  controllers: [
    LogsController
  ],
  exports: [
    LogsService,
  ]
})
export class LogsModule { }

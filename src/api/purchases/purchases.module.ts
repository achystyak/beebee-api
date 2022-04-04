import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

import { PurchasesService } from './purchases.service';
import { Purchase, PurchaseSchema } from './purchases.type';

import { PurchasesController } from './purchases.controller';
import { LogsModule } from '../logs/logs.module';
import { BikesModule } from '../bikes/bikes.module';
import { CreditsModule } from '../credits/credits.module';
import { UsersModule } from '../users/users.module';
// Imports

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Purchase.name, schema: PurchaseSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => LogsModule),
    forwardRef(() => BikesModule),
    forwardRef(() => CreditsModule),
    forwardRef(() => UsersModule),
    // Inject
  ],
  providers: [
    PurchasesService,
  ],
  controllers: [
    PurchasesController
  ],
  exports: [
    PurchasesService,
  ]
})
export class PurchasesModule { }

import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

import { BikesService } from './bikes.service';
import { Bike, BikeSchema } from './bikes.type';

import { BikesController } from './bikes.controller';
import { PurchasesModule } from '../purchases/purchases.module';
import { RidesModule } from '../rides/rides.module';
// Imports

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bike.name, schema: BikeSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => PurchasesModule),
    forwardRef(() => RidesModule),
    // Inject
  ],
  providers: [
    BikesService,
  ],
  controllers: [
    BikesController
  ],
  exports: [
    BikesService,
  ]
})
export class BikesModule { }

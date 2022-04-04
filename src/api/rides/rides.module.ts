import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

import { RidesService } from './rides.service';
import { Ride, RideSchema } from './rides.type';

import { RidesController } from './rides.controller';
import { LogsModule } from '../logs/logs.module';
import { BikesModule } from '../bikes/bikes.module';
import { UsersModule } from '../users/users.module';
// Imports

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ride.name, schema: RideSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => LogsModule),
    forwardRef(() => BikesModule),
    forwardRef(() => UsersModule),
    // Inject
  ],
  providers: [
    RidesService,
  ],
  controllers: [
    RidesController
  ],
  exports: [
    RidesService,
  ]
})
export class RidesModule { }

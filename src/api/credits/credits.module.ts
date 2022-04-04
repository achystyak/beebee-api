import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

import { CreditsService } from './credits.service';
import { Credit, CreditSchema } from './credits.type';

import { CreditsController } from './credits.controller';
import { UsersModule } from '../users/users.module';
import { PurchasesModule } from '../purchases/purchases.module';
// Imports

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Credit.name, schema: CreditSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    forwardRef(() => PurchasesModule),
    // Inject
  ],
  providers: [
    CreditsService,
  ],
  controllers: [
    CreditsController
  ],
  exports: [
    CreditsService,
  ]
})
export class CreditsModule { }

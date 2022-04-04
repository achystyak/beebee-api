import { Controller, Get, Post, Body, Patch, Put, Param, Delete, UseGuards, Inject, forwardRef } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckPolicies } from 'src/auth/ability/policies.guard';
import { AuthService } from 'src/auth/auth.service';
import { RestSession } from 'src/common/common.decorators';
import { Action } from 'src/common/common.enums';
import { ServerError } from 'src/common/common.errors'
import { Publisher } from 'src/subscriptions/publisher.sub';
import { FindPurchaseInput } from './dto/find-purchase.input';
import { CreatePurchaseInput } from './dto/create-purchase.input';
import { UpdatePurchaseInput } from './dto/update-purchase.input';
import { DeletePurchaseInput } from './dto/delete-purchase.input';
import { PurchasesService } from './purchases.service';
import { Purchase } from './purchases.type';
import { Log } from '../logs/logs.type';
import { Bike } from '../bikes/bikes.type';
import { Credit } from '../credits/credits.type';
// Imports
import { User } from '../users/users.type';

@ApiBearerAuth()
@ApiTags('Purchases')
@Controller('purchases')
export class PurchasesController {
  constructor(
    @Inject(forwardRef(() => PurchasesService)) private readonly purchasesService: PurchasesService,
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService
  ) { }


//     @Post('/find')
//   @UseGuards(AuthGuard('jwt'))
//   @ApiOkResponse({ type: Purchase })
//   @CheckPolicies(ability => ability.can(Action.View, Purchase))
//   async findOne(
//     @Body() body: FindPurchaseInput,
//     @RestSession() session: User
//   ): Promise<Purchase> {
//     const entity = await this.purchasesService.findPurchase(session, body);
//     return entity && await this.authService.able(session, Action.View, entity);
//   }
  
//   @Post('/list')
//   @UseGuards(AuthGuard('jwt'))
//   @ApiOkResponse({ type: [Purchase] })
//   @CheckPolicies(ability => ability.can(Action.View, Purchase))
//   async findMany(
//     @Body() body: FindPurchaseInput,
//     @RestSession() session: User
//   ): Promise<Purchase[]> {
//     const entities = await this.purchasesService.findPurchases(session, body);
//     return await this.authService.ableFilter(session, Action.View, entities);
//   }
  
//   @Post('/create')
//   @UseGuards(AuthGuard('jwt'))
//   @ApiOkResponse({ type: [Purchase] })
//   @CheckPolicies(ability => ability.can(Action.Create, Purchase))
//   async create(
//     @RestSession() session: User,
//     @Body() body: CreatePurchaseInput
//   ) {
//     const result = await this.purchasesService.create(session, [body]);
//     return result.length && result[0];
//   }

//   @Post('/create/bulk')
//   @UseGuards(AuthGuard('jwt'))
//   @ApiOkResponse({ type: [Purchase] })
//   @CheckPolicies(ability => ability.can(Action.Create, Purchase))
//   async createMany(
//     @RestSession() session: User,
//     @Body() body: CreatePurchaseInput[]
//   ) {
//     return await this.purchasesService.create(session, body);
//   }
  
//   @Patch(':id')
//   @UseGuards(AuthGuard('jwt'))
//   @ApiOkResponse({ type: Purchase })
//   @CheckPolicies(ability => ability.can(Action.Update, Purchase))
//   async update(
//     @Param('id') _id: string,
//     @RestSession() session: User,
//     @Body() body: UpdatePurchaseInput
//   ) {
//     const entity = await this.purchasesService.findOne({ _id });
//     if (!entity) {
//       throw ServerError.badRequest('Purchase not found');
//     }
//     const able = await this.authService.able(session, Action.Update, entity);
//     const purchase = await this.purchasesService.update(session, able._id, body);
//     if (purchase) {
//       Publisher.sub.publish('purchasesUpdated', { purchasesUpdated: [purchase] });
//     }
//     return purchase;
//   }
  
//   @Delete(':id')
//   @UseGuards(AuthGuard('jwt'))
//   @ApiOkResponse({ type: Purchase })
//   async delete(
//     @Param('id') _id: string,
//     @RestSession() session: User,
//   ) {
//     const entity = await this.purchasesService.findOne({ _id });
//     if (!entity) {
//       throw ServerError.badRequest('Purchase not found');
//     }
//     return await this.purchasesService.deletePurchase(session, _id);
//   }
 
//   @Put('/delete')
//   @UseGuards(AuthGuard('jwt'))
//   @ApiOkResponse({ type: Purchase })
//   async deleteMany(
//     @RestSession() session: User,
//     @Body() body: DeletePurchaseInput
//   ) {
//     return await this.purchasesService.deletePurchases(session, body);
//   }
  
//   @Get(':id/logs')
//   @UseGuards(AuthGuard('jwt'))
//   @ApiOkResponse({ type: [Log] })
//   async logs(
//     @RestSession() session: User,
//     @Param('id') _id: string): Promise<Log[]> {
//     const parent = await this.purchasesService.findOne({ _id });
//     const result = parent && await this.purchasesService.logs(parent);
//     return result && await this.authService.ableFilter(session, Action.View, result);
//   }

//   @Get(':id/bike')
//   @UseGuards(AuthGuard('jwt'))
//   @ApiOkResponse({ type: Bike })
//   async bike(
//     @RestSession() session: User,
//     @Param('id') _id: string): Promise<Bike> {
//     const parent = await this.purchasesService.findOne({ _id });
//     const result = parent && await this.purchasesService.bike(parent);
//     return result && await this.authService.able(session, Action.View, result);
//   }

//   @Get(':id/credits')
//   @UseGuards(AuthGuard('jwt'))
//   @ApiOkResponse({ type: Credit })
//   async credits(
//     @RestSession() session: User,
//     @Param('id') _id: string): Promise<Credit> {
//     const parent = await this.purchasesService.findOne({ _id });
//     const result = parent && await this.purchasesService.credits(parent);
//     return result && await this.authService.able(session, Action.View, result);
//   }

//   @Get(':id/user')
//   @UseGuards(AuthGuard('jwt'))
//   @ApiOkResponse({ type: User })
//   async user(
//     @RestSession() session: User,
//     @Param('id') _id: string): Promise<User> {
//     const parent = await this.purchasesService.findOne({ _id });
//     const result = parent && await this.purchasesService.user(parent);
//     return result && await this.authService.able(session, Action.View, result);
//   }

// // Methods
  
}

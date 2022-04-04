import { Controller, Get, Post, Body, Patch, Put, Param, Delete, UseGuards, Inject, forwardRef } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckPolicies } from 'src/auth/ability/policies.guard';
import { AuthService } from 'src/auth/auth.service';
import { RestSession } from 'src/common/common.decorators';
import { Action } from 'src/common/common.enums';
import { ServerError } from 'src/common/common.errors'
import { Publisher } from 'src/subscriptions/publisher.sub';
import { FindCreditInput } from './dto/find-credit.input';
import { CreateCreditInput } from './dto/create-credit.input';
import { UpdateCreditInput } from './dto/update-credit.input';
import { DeleteCreditInput } from './dto/delete-credit.input';
import { CreditsService } from './credits.service';
import { Credit } from './credits.type';
import { Purchase } from '../purchases/purchases.type';
// Imports
import { User } from '../users/users.type';

@ApiBearerAuth()
@ApiTags('Credits')
@Controller('credits')
export class CreditsController {
  constructor(
    @Inject(forwardRef(() => CreditsService)) private readonly creditsService: CreditsService,
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService
  ) { }


  //     @Post('/find')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: Credit })
  //   @CheckPolicies(ability => ability.can(Action.View, Credit))
  //   async findOne(
  //     @Body() body: FindCreditInput,
  //     @RestSession() session: User
  //   ): Promise<Credit> {
  //     const entity = await this.creditsService.findCredit(session, body);
  //     return entity && await this.authService.able(session, Action.View, entity);
  //   }

  //   @Post('/list')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: [Credit] })
  //   @CheckPolicies(ability => ability.can(Action.View, Credit))
  //   async findMany(
  //     @Body() body: FindCreditInput,
  //     @RestSession() session: User
  //   ): Promise<Credit[]> {
  //     const entities = await this.creditsService.findCredits(session, body);
  //     return await this.authService.ableFilter(session, Action.View, entities);
  //   }

  //   @Post('/create')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: [Credit] })
  //   @CheckPolicies(ability => ability.can(Action.Create, Credit))
  //   async create(
  //     @RestSession() session: User,
  //     @Body() body: CreateCreditInput
  //   ) {
  //     const result = await this.creditsService.create(session, [body]);
  //     return result.length && result[0];
  //   }

  //   @Post('/create/bulk')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: [Credit] })
  //   @CheckPolicies(ability => ability.can(Action.Create, Credit))
  //   async createMany(
  //     @RestSession() session: User,
  //     @Body() body: CreateCreditInput[]
  //   ) {
  //     return await this.creditsService.create(session, body);
  //   }

  //   @Patch(':id')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: Credit })
  //   @CheckPolicies(ability => ability.can(Action.Update, Credit))
  //   async update(
  //     @Param('id') _id: string,
  //     @RestSession() session: User,
  //     @Body() body: UpdateCreditInput
  //   ) {
  //     const entity = await this.creditsService.findOne({ _id });
  //     if (!entity) {
  //       throw ServerError.badRequest('Credit not found');
  //     }
  //     const able = await this.authService.able(session, Action.Update, entity);
  //     const credit = await this.creditsService.update(session, able._id, body);
  //     if (credit) {
  //       Publisher.sub.publish('creditsUpdated', { creditsUpdated: [credit] });
  //     }
  //     return credit;
  //   }

  //   @Delete(':id')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: Credit })
  //   async delete(
  //     @Param('id') _id: string,
  //     @RestSession() session: User,
  //   ) {
  //     const entity = await this.creditsService.findOne({ _id });
  //     if (!entity) {
  //       throw ServerError.badRequest('Credit not found');
  //     }
  //     return await this.creditsService.deleteCredit(session, _id);
  //   }

  //   @Put('/delete')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: Credit })
  //   async deleteMany(
  //     @RestSession() session: User,
  //     @Body() body: DeleteCreditInput
  //   ) {
  //     return await this.creditsService.deleteCredits(session, body);
  //   }

  //   @Get(':id/user')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: User })
  //   async user(
  //     @RestSession() session: User,
  //     @Param('id') _id: string): Promise<User> {
  //     const parent = await this.creditsService.findOne({ _id });
  //     const result = parent && await this.creditsService.user(parent);
  //     return result && await this.authService.able(session, Action.View, result);
  //   }

  //   @Get(':id/purchases')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: [Purchase] })
  //   async purchases(
  //     @RestSession() session: User,
  //     @Param('id') _id: string): Promise<Purchase[]> {
  //     const parent = await this.creditsService.findOne({ _id });
  //     const result = parent && await this.creditsService.purchases(parent);
  //     return result && await this.authService.ableFilter(session, Action.View, result);
  //   }

  // // Methods

}

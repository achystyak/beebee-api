import { Controller, Get, Post, Body, Patch, Put, Param, Delete, UseGuards, Inject, forwardRef } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckPolicies } from 'src/auth/ability/policies.guard';
import { AuthService } from 'src/auth/auth.service';
import { RestSession } from 'src/common/common.decorators';
import { Action } from 'src/common/common.enums';
import { ServerError } from 'src/common/common.errors'
import { Publisher } from 'src/subscriptions/publisher.sub';
import { FindUserInput } from './dto/find-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { DeleteUserInput } from './dto/delete-user.input';
import { UsersService } from './users.service';
import { User } from './users.type';
import { Credit } from '../credits/credits.type';
import { Log } from '../logs/logs.type';
import { Purchase } from '../purchases/purchases.type';
import { Ride } from '../rides/rides.type';
// Imports


@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService
  ) { }


  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: User })
  async me(
    @RestSession() session: User,
    @Param('id') _id: string): Promise<User> {
    return await this.usersService.findOne(
      { _id: session._id },
      { projection: { password: 0 } }
    );
  }

  // @Post('/find')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiOkResponse({ type: User })
  // @CheckPolicies(ability => ability.can(Action.View, User))
  // async findOne(
  //   @Body() body: FindUserInput,
  //   @RestSession() session: User
  // ): Promise<User> {
  //   const entity = await this.usersService.findUser(session, body);
  //   return entity && await this.authService.able(session, Action.View, entity);
  // }

  // @Post('/list')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiOkResponse({ type: [User] })
  // @CheckPolicies(ability => ability.can(Action.View, User))
  // async findMany(
  //   @Body() body: FindUserInput,
  //   @RestSession() session: User
  // ): Promise<User[]> {
  //   const entities = await this.usersService.findUsers(session, body);
  //   return await this.authService.ableFilter(session, Action.View, entities);
  // }

  // @Post('/create')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiOkResponse({ type: [User] })
  // @CheckPolicies(ability => ability.can(Action.Create, User))
  // async create(
  //   @RestSession() session: User,
  //   @Body() body: CreateUserInput
  // ) {
  //   const result = await this.usersService.create(session, [body]);
  //   return result.length && result[0];
  // }

  // @Post('/create/bulk')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiOkResponse({ type: [User] })
  // @CheckPolicies(ability => ability.can(Action.Create, User))
  // async createMany(
  //   @RestSession() session: User,
  //   @Body() body: CreateUserInput[]
  // ) {
  //   return await this.usersService.create(session, body);
  // }

  // @Patch(':id')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiOkResponse({ type: User })
  // @CheckPolicies(ability => ability.can(Action.Update, User))
  // async update(
  //   @Param('id') _id: string,
  //   @RestSession() session: User,
  //   @Body() body: UpdateUserInput
  // ) {
  //   const entity = await this.usersService.findOne({ _id });
  //   if (!entity) {
  //     throw ServerError.badRequest('User not found');
  //   }
  //   const able = await this.authService.able(session, Action.Update, entity);
  //   const user = await this.usersService.update(session, able._id, body);
  //   if (user) {
  //     Publisher.sub.publish('usersUpdated', { usersUpdated: [user] });
  //   }
  //   return user;
  // }

  // @Delete(':id')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiOkResponse({ type: User })
  // async delete(
  //   @Param('id') _id: string,
  //   @RestSession() session: User,
  // ) {
  //   const entity = await this.usersService.findOne({ _id });
  //   if (!entity) {
  //     throw ServerError.badRequest('User not found');
  //   }
  //   return await this.usersService.deleteUser(session, _id);
  // }

  // @Put('/delete')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiOkResponse({ type: User })
  // async deleteMany(
  //   @RestSession() session: User,
  //   @Body() body: DeleteUserInput
  // ) {
  //   return await this.usersService.deleteUsers(session, body);
  // }

  // @Get(':id/credits')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiOkResponse({ type: [Credit] })
  // async credits(
  //   @RestSession() session: User,
  //   @Param('id') _id: string): Promise<Credit[]> {
  //   const parent = await this.usersService.findOne({ _id });
  //   const result = parent && await this.usersService.credits(parent);
  //   return result && await this.authService.ableFilter(session, Action.View, result);
  // }

  // @Get(':id/logs')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiOkResponse({ type: [Log] })
  // async logs(
  //   @RestSession() session: User,
  //   @Param('id') _id: string): Promise<Log[]> {
  //   const parent = await this.usersService.findOne({ _id });
  //   const result = parent && await this.usersService.logs(parent);
  //   return result && await this.authService.ableFilter(session, Action.View, result);
  // }

  // @Get(':id/purchases')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiOkResponse({ type: [Purchase] })
  // async purchases(
  //   @RestSession() session: User,
  //   @Param('id') _id: string): Promise<Purchase[]> {
  //   const parent = await this.usersService.findOne({ _id });
  //   const result = parent && await this.usersService.purchases(parent);
  //   return result && await this.authService.ableFilter(session, Action.View, result);
  // }

  // @Get(':id/rides')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiOkResponse({ type: [Ride] })
  // async rides(
  //   @RestSession() session: User,
  //   @Param('id') _id: string): Promise<Ride[]> {
  //   const parent = await this.usersService.findOne({ _id });
  //   const result = parent && await this.usersService.rides(parent);
  //   return result && await this.authService.ableFilter(session, Action.View, result);
  // }

  // Methods

}

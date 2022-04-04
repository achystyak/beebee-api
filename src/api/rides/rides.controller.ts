import { Controller, Get, Post, Body, Patch, Put, Param, Delete, UseGuards, Inject, forwardRef } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckPolicies } from 'src/auth/ability/policies.guard';
import { AuthService } from 'src/auth/auth.service';
import { RestSession } from 'src/common/common.decorators';
import { Action } from 'src/common/common.enums';
import { ServerError } from 'src/common/common.errors'
import { Publisher } from 'src/subscriptions/publisher.sub';
import { FindRideInput } from './dto/find-ride.input';
import { CreateRideInput } from './dto/create-ride.input';
import { UpdateRideInput } from './dto/update-ride.input';
import { DeleteRideInput } from './dto/delete-ride.input';
import { RidesService } from './rides.service';
import { Ride } from './rides.type';
import { Log } from '../logs/logs.type';
import { Bike } from '../bikes/bikes.type';
// Imports
import { User } from '../users/users.type';

@ApiBearerAuth()
@ApiTags('Rides')
@Controller('rides')
export class RidesController {
  constructor(
    @Inject(forwardRef(() => RidesService)) private readonly ridesService: RidesService,
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService
  ) { }


  //     @Post('/find')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: Ride })
  //   @CheckPolicies(ability => ability.can(Action.View, Ride))
  //   async findOne(
  //     @Body() body: FindRideInput,
  //     @RestSession() session: User
  //   ): Promise<Ride> {
  //     const entity = await this.ridesService.findRide(session, body);
  //     return entity && await this.authService.able(session, Action.View, entity);
  //   }

  //   @Post('/list')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: [Ride] })
  //   @CheckPolicies(ability => ability.can(Action.View, Ride))
  //   async findMany(
  //     @Body() body: FindRideInput,
  //     @RestSession() session: User
  //   ): Promise<Ride[]> {
  //     const entities = await this.ridesService.findRides(session, body);
  //     return await this.authService.ableFilter(session, Action.View, entities);
  //   }

  //   @Post('/create')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: [Ride] })
  //   @CheckPolicies(ability => ability.can(Action.Create, Ride))
  //   async create(
  //     @RestSession() session: User,
  //     @Body() body: CreateRideInput
  //   ) {
  //     const result = await this.ridesService.create(session, [body]);
  //     return result.length && result[0];
  //   }

  //   @Post('/create/bulk')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: [Ride] })
  //   @CheckPolicies(ability => ability.can(Action.Create, Ride))
  //   async createMany(
  //     @RestSession() session: User,
  //     @Body() body: CreateRideInput[]
  //   ) {
  //     return await this.ridesService.create(session, body);
  //   }

  //   @Patch(':id')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: Ride })
  //   @CheckPolicies(ability => ability.can(Action.Update, Ride))
  //   async update(
  //     @Param('id') _id: string,
  //     @RestSession() session: User,
  //     @Body() body: UpdateRideInput
  //   ) {
  //     const entity = await this.ridesService.findOne({ _id });
  //     if (!entity) {
  //       throw ServerError.badRequest('Ride not found');
  //     }
  //     const able = await this.authService.able(session, Action.Update, entity);
  //     const ride = await this.ridesService.update(session, able._id, body);
  //     if (ride) {
  //       Publisher.sub.publish('ridesUpdated', { ridesUpdated: [ride] });
  //     }
  //     return ride;
  //   }

  //   @Delete(':id')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: Ride })
  //   async delete(
  //     @Param('id') _id: string,
  //     @RestSession() session: User,
  //   ) {
  //     const entity = await this.ridesService.findOne({ _id });
  //     if (!entity) {
  //       throw ServerError.badRequest('Ride not found');
  //     }
  //     return await this.ridesService.deleteRide(session, _id);
  //   }

  //   @Put('/delete')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: Ride })
  //   async deleteMany(
  //     @RestSession() session: User,
  //     @Body() body: DeleteRideInput
  //   ) {
  //     return await this.ridesService.deleteRides(session, body);
  //   }

  //   @Get(':id/logs')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: [Log] })
  //   async logs(
  //     @RestSession() session: User,
  //     @Param('id') _id: string): Promise<Log[]> {
  //     const parent = await this.ridesService.findOne({ _id });
  //     const result = parent && await this.ridesService.logs(parent);
  //     return result && await this.authService.ableFilter(session, Action.View, result);
  //   }

  //   @Get(':id/bike')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: Bike })
  //   async bike(
  //     @RestSession() session: User,
  //     @Param('id') _id: string): Promise<Bike> {
  //     const parent = await this.ridesService.findOne({ _id });
  //     const result = parent && await this.ridesService.bike(parent);
  //     return result && await this.authService.able(session, Action.View, result);
  //   }

  //   @Get(':id/user')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: User })
  //   async user(
  //     @RestSession() session: User,
  //     @Param('id') _id: string): Promise<User> {
  //     const parent = await this.ridesService.findOne({ _id });
  //     const result = parent && await this.ridesService.user(parent);
  //     return result && await this.authService.able(session, Action.View, result);
  //   }

  // // Methods

}

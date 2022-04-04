import { Controller, Get, Post, Body, Patch, Put, Param, Delete, UseGuards, Inject, forwardRef } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckPolicies } from 'src/auth/ability/policies.guard';
import { AuthService } from 'src/auth/auth.service';
import { RestSession } from 'src/common/common.decorators';
import { Action } from 'src/common/common.enums';
import { ServerError } from 'src/common/common.errors'
import { Publisher } from 'src/subscriptions/publisher.sub';
import { FindLogInput } from './dto/find-log.input';
import { CreateLogInput } from './dto/create-log.input';
import { UpdateLogInput } from './dto/update-log.input';
import { DeleteLogInput } from './dto/delete-log.input';
import { LogsService } from './logs.service';
import { Log } from './logs.type';
import { Purchase } from '../purchases/purchases.type';
import { Ride } from '../rides/rides.type';
// Imports
import { User } from '../users/users.type';

@ApiBearerAuth()
@ApiTags('Logs')
@Controller('logs')
export class LogsController {
  constructor(
    @Inject(forwardRef(() => LogsService)) private readonly logsService: LogsService,
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService
  ) { }


  //     @Post('/find')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: Log })
  //   @CheckPolicies(ability => ability.can(Action.View, Log))
  //   async findOne(
  //     @Body() body: FindLogInput,
  //     @RestSession() session: User
  //   ): Promise<Log> {
  //     const entity = await this.logsService.findLog(session, body);
  //     return entity && await this.authService.able(session, Action.View, entity);
  //   }

  //   @Post('/list')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: [Log] })
  //   @CheckPolicies(ability => ability.can(Action.View, Log))
  //   async findMany(
  //     @Body() body: FindLogInput,
  //     @RestSession() session: User
  //   ): Promise<Log[]> {
  //     const entities = await this.logsService.findLogs(session, body);
  //     return await this.authService.ableFilter(session, Action.View, entities);
  //   }

  //   @Post('/create')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: [Log] })
  //   @CheckPolicies(ability => ability.can(Action.Create, Log))
  //   async create(
  //     @RestSession() session: User,
  //     @Body() body: CreateLogInput
  //   ) {
  //     const result = await this.logsService.create(session, [body]);
  //     return result.length && result[0];
  //   }

  //   @Post('/create/bulk')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: [Log] })
  //   @CheckPolicies(ability => ability.can(Action.Create, Log))
  //   async createMany(
  //     @RestSession() session: User,
  //     @Body() body: CreateLogInput[]
  //   ) {
  //     return await this.logsService.create(session, body);
  //   }

  //   @Patch(':id')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: Log })
  //   @CheckPolicies(ability => ability.can(Action.Update, Log))
  //   async update(
  //     @Param('id') _id: string,
  //     @RestSession() session: User,
  //     @Body() body: UpdateLogInput
  //   ) {
  //     const entity = await this.logsService.findOne({ _id });
  //     if (!entity) {
  //       throw ServerError.badRequest('Log not found');
  //     }
  //     const able = await this.authService.able(session, Action.Update, entity);
  //     const log = await this.logsService.update(session, able._id, body);
  //     if (log) {
  //       Publisher.sub.publish('logsUpdated', { logsUpdated: [log] });
  //     }
  //     return log;
  //   }

  //   @Delete(':id')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: Log })
  //   async delete(
  //     @Param('id') _id: string,
  //     @RestSession() session: User,
  //   ) {
  //     const entity = await this.logsService.findOne({ _id });
  //     if (!entity) {
  //       throw ServerError.badRequest('Log not found');
  //     }
  //     return await this.logsService.deleteLog(session, _id);
  //   }

  //   @Put('/delete')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: Log })
  //   async deleteMany(
  //     @RestSession() session: User,
  //     @Body() body: DeleteLogInput
  //   ) {
  //     return await this.logsService.deleteLogs(session, body);
  //   }

  //   @Get(':id/purchase')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: Purchase })
  //   async purchase(
  //     @RestSession() session: User,
  //     @Param('id') _id: string): Promise<Purchase> {
  //     const parent = await this.logsService.findOne({ _id });
  //     const result = parent && await this.logsService.purchase(parent);
  //     return result && await this.authService.able(session, Action.View, result);
  //   }

  //   @Get(':id/ride')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: Ride })
  //   async ride(
  //     @RestSession() session: User,
  //     @Param('id') _id: string): Promise<Ride> {
  //     const parent = await this.logsService.findOne({ _id });
  //     const result = parent && await this.logsService.ride(parent);
  //     return result && await this.authService.able(session, Action.View, result);
  //   }

  //   @Get(':id/user')
  //   @UseGuards(AuthGuard('jwt'))
  //   @ApiOkResponse({ type: User })
  //   async user(
  //     @RestSession() session: User,
  //     @Param('id') _id: string): Promise<User> {
  //     const parent = await this.logsService.findOne({ _id });
  //     const result = parent && await this.logsService.user(parent);
  //     return result && await this.authService.able(session, Action.View, result);
  //   }

  // // Methods

}

import { Controller, Get, Post, Body, Patch, Put, Param, Delete, UseGuards, Inject, forwardRef } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckPolicies } from 'src/auth/ability/policies.guard';
import { AuthService } from 'src/auth/auth.service';
import { RestSession } from 'src/common/common.decorators';
import { Action } from 'src/common/common.enums';
import { ServerError } from 'src/common/common.errors'
import { Publisher } from 'src/subscriptions/publisher.sub';
import { FindBikeInput } from './dto/find-bike.input';
import { CreateBikeInput } from './dto/create-bike.input';
import { UpdateBikeInput } from './dto/update-bike.input';
import { DeleteBikeInput } from './dto/delete-bike.input';
import { BikesService } from './bikes.service';
import { Bike } from './bikes.type';
import { Purchase } from '../purchases/purchases.type';
import { Ride } from '../rides/rides.type';
// Imports
import { User } from '../users/users.type';

@ApiBearerAuth()
@ApiTags('Bikes')
@Controller('bikes')
export class BikesController {
  constructor(
    @Inject(forwardRef(() => BikesService)) private readonly bikesService: BikesService,
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService
  ) { }

}

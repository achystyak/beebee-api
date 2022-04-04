import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { BaseService, BaseServiceArgs } from 'src/common/base.service';
import { Ride, RideDocument } from './rides.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServerError } from 'src/common/common.errors';
import { FindRideInput } from './dto/find-ride.input';
import { CreateRideInput } from './dto/create-ride.input';
import { UpdateRideInput } from './dto/update-ride.input';
import { DeleteRideInput } from './dto/delete-ride.input';
import { Action } from 'src/common/common.enums';
import { LogsService } from 'src/api/logs/logs.service';
import { Log } from '../logs/logs.type';
import { BikesService } from 'src/api/bikes/bikes.service';
import { Bike } from '../bikes/bikes.type';
import { UsersService } from 'src/api/users/users.service';
// Imports
import { User } from '../users/users.type';

@Injectable()
export class RidesService extends BaseService<Ride> {

  constructor(
    @InjectModel(Ride.name) private model: Model<RideDocument>,
    @Inject(forwardRef(() => LogsService)) private readonly logsService: LogsService,
    @Inject(forwardRef(() => BikesService)) private readonly bikesService: BikesService,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
    // Inject
  ) {
    super(model);
  }

  async logs(ride: Ride): Promise<Log[]> {
    return await this.logsService.find({ ride: ride._id })
  }
  
  async bike(ride: Ride): Promise<Bike> {
    return await this.bikesService.findOne({ _id: ride.bike._id });
  }
  
  async user(ride: Ride): Promise<User> {
    return await this.usersService.findOne({ _id: ride.user._id });
  }
  
  // Resolve Fields

    public async findRide(session: User, input: FindRideInput): Promise<Ride> {
    const { filter, args } = this.findOptions(input);
    const ride = await this.findOne(filter, args);
    if (!ride) {
      throw ServerError.notFound('Ride not found');
    }
    return ride;
  }
  
  public async findRides(session: User, input: FindRideInput): Promise<Ride[]> {
    const { filter, args } = this.findOptions(input);
    return await this.find(filter, args);
  }
  
async create(session: User, data: CreateRideInput[]): Promise<Ride[]> {
    const entities = data.map(input => Ride.fromDto(new Ride(), input));
    if (entities.length == 0) {
      throw ServerError.badRequest('Empty input');
    }
    try {
      const result = await super.createMany(entities);
      this.log(Action.Create, session, { _ids: result.map(r => r._id) })
      return result;
    } catch {
      throw ServerError.badRequest('Rides not created');
    }
  }
  
async update(session: User, _id: string, input: UpdateRideInput): Promise<Ride> {
    const ride = await this.findOne({ _id });
    if (!ride) {
      throw ServerError.notFound('Ride not found');
    }
    try {
      const updated = Ride.fromDto(ride, input);
      if (!(await this.model.updateOne({ _id }, updated)).ok) {
        throw ServerError.badRequest('Ride not updated');
      }
      this.log(Action.Update, session, { _id });
      return await this.findOne({ _id });
    } catch {
      throw ServerError.badRequest('Ride not updated');
    }
  }

  async deleteRide(session: User, _id: string): Promise<Ride> {
    const ride = await this.findOne({ _id });
    if (!ride) {
      throw ServerError.notFound('Ride not found');
    }
    try {
      if (!(await super.deleteOne({ _id }))) {
        throw ServerError.badRequest('Ride not deleted');
      }
      this.log(Action.Delete, session, { _id });
      return ride;

    } catch {
      throw ServerError.badRequest('Ride not deleted');
    }
  }

  async deleteRides(session: User, input: DeleteRideInput): Promise<Ride[]> {
    const entities = await this.find({ _id: { $in: input.ids } });
    if (entities.length != input.ids.length) {
      throw ServerError.notFound('Rides not found');
    }
    try {
      if (!(await super.deleteMany({ _id: { $in: entities.map(entity => entity._id) } })).length) {
        throw ServerError.badRequest('Ride not deleted');
      }
      this.log(Action.Delete, session, { ids: input.ids });
      return entities;

    } catch {
      throw ServerError.badRequest('Ride not deleted');
    }
  }

// Methods
  private findOptions(input: FindRideInput) {
    if (!input || Object.keys(input).length == 0) {
      throw ServerError.badRequest('Wrong input');
    }
    const { search, pagination, ...fields } = input;
    const args: BaseServiceArgs = { paged: pagination };
    let filter: any = {
      ...fields,
      ...this.searchFor({
        search, fields: [
            
            ]
      })
    };
    
    return { filter, args };
  }
  

}

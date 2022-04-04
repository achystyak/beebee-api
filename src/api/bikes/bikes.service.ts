import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { BaseService, BaseServiceArgs } from 'src/common/base.service';
import { Bike, BikeDocument } from './bikes.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServerError } from 'src/common/common.errors';
import { FindBikeInput } from './dto/find-bike.input';
import { CreateBikeInput } from './dto/create-bike.input';
import { UpdateBikeInput } from './dto/update-bike.input';
import { DeleteBikeInput } from './dto/delete-bike.input';
import { Action } from 'src/common/common.enums';
import { PurchasesService } from 'src/api/purchases/purchases.service';
import { Purchase } from '../purchases/purchases.type';
import { RidesService } from 'src/api/rides/rides.service';
import { Ride } from '../rides/rides.type';
// Imports
import { User } from '../users/users.type';

@Injectable()
export class BikesService extends BaseService<Bike> {

  constructor(
    @InjectModel(Bike.name) private model: Model<BikeDocument>,
    @Inject(forwardRef(() => PurchasesService)) private readonly purchasesService: PurchasesService,
    @Inject(forwardRef(() => RidesService)) private readonly ridesService: RidesService,
    // Inject
  ) {
    super(model);
  }

  async purchases(bike: Bike): Promise<Purchase[]> {
    return await this.purchasesService.find({ bike: bike._id })
  }

  async rides(bike: Bike): Promise<Ride[]> {
    return await this.ridesService.find({ bike: bike._id })
  }

  // Resolve Fields

  public async findBike(session: User, input: FindBikeInput): Promise<Bike> {
    const { filter, args } = this.findOptions(input);
    const bike = await this.findOne(filter, args);
    if (!bike) {
      throw ServerError.notFound('Bike not found');
    }
    return bike;
  }

  public async findBikes(session: User, input: FindBikeInput): Promise<Bike[]> {
    const { filter, args } = this.findOptions(input);
    return await this.find(filter, args);
  }

  async create(session: User, data: CreateBikeInput[]): Promise<Bike[]> {
    const entities = data.map(input => Bike.fromDto(new Bike(), input));
    if (entities.length == 0) {
      throw ServerError.badRequest('Empty input');
    }
    try {
      const result = await super.createMany(entities);
      this.log(Action.Create, session, { _ids: result.map(r => r._id) })
      return result;
    } catch {
      throw ServerError.badRequest('Bikes not created');
    }
  }

  async update(session: User, _id: string, input: UpdateBikeInput): Promise<Bike> {
    const bike = await this.findOne({ _id });
    if (!bike) {
      throw ServerError.notFound('Bike not found');
    }
    try {
      const updated = Bike.fromDto(bike, input);
      if (!(await this.model.updateOne({ _id }, updated)).ok) {
        throw ServerError.badRequest('Bike not updated');
      }
      this.log(Action.Update, session, { _id });
      return await this.findOne({ _id });
    } catch {
      throw ServerError.badRequest('Bike not updated');
    }
  }

  async deleteBike(session: User, _id: string): Promise<Bike> {
    const bike = await this.findOne({ _id });
    if (!bike) {
      throw ServerError.notFound('Bike not found');
    }
    try {
      if (!(await super.deleteOne({ _id }))) {
        throw ServerError.badRequest('Bike not deleted');
      }
      this.log(Action.Delete, session, { _id });
      return bike;

    } catch {
      throw ServerError.badRequest('Bike not deleted');
    }
  }

  async deleteBikes(session: User, input: DeleteBikeInput): Promise<Bike[]> {
    const entities = await this.find({ _id: { $in: input.ids } });
    if (entities.length != input.ids.length) {
      throw ServerError.notFound('Bikes not found');
    }
    try {
      if (!(await super.deleteMany({ _id: { $in: entities.map(entity => entity._id) } })).length) {
        throw ServerError.badRequest('Bike not deleted');
      }
      this.log(Action.Delete, session, { ids: input.ids });
      return entities;

    } catch {
      throw ServerError.badRequest('Bike not deleted');
    }
  }

  // Methods
  private findOptions(input: FindBikeInput) {
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

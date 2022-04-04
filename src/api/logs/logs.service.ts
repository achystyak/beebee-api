import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { BaseService, BaseServiceArgs } from 'src/common/base.service';
import { Log, LogDocument } from './logs.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServerError } from 'src/common/common.errors';
import { FindLogInput } from './dto/find-log.input';
import { CreateLogInput } from './dto/create-log.input';
import { UpdateLogInput } from './dto/update-log.input';
import { DeleteLogInput } from './dto/delete-log.input';
import { Action } from 'src/common/common.enums';
import { PurchasesService } from 'src/api/purchases/purchases.service';
import { Purchase } from '../purchases/purchases.type';
import { RidesService } from 'src/api/rides/rides.service';
import { Ride } from '../rides/rides.type';
import { UsersService } from 'src/api/users/users.service';
// Imports
import { User } from '../users/users.type';

@Injectable()
export class LogsService extends BaseService<Log> {

  constructor(
    @InjectModel(Log.name) private model: Model<LogDocument>,
    @Inject(forwardRef(() => PurchasesService)) private readonly purchasesService: PurchasesService,
    @Inject(forwardRef(() => RidesService)) private readonly ridesService: RidesService,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
    // Inject
  ) {
    super(model);
  }

  async purchase(log: Log): Promise<Purchase> {
    return await this.purchasesService.findOne({ _id: log.purchase._id });
  }
  
  async ride(log: Log): Promise<Ride> {
    return await this.ridesService.findOne({ _id: log.ride._id });
  }
  
  async user(log: Log): Promise<User> {
    return await this.usersService.findOne({ _id: log.user._id });
  }
  
  // Resolve Fields

    public async findLog(session: User, input: FindLogInput): Promise<Log> {
    const { filter, args } = this.findOptions(input);
    const log = await this.findOne(filter, args);
    if (!log) {
      throw ServerError.notFound('Log not found');
    }
    return log;
  }
  
  public async findLogs(session: User, input: FindLogInput): Promise<Log[]> {
    const { filter, args } = this.findOptions(input);
    return await this.find(filter, args);
  }
  
async create(session: User, data: CreateLogInput[]): Promise<Log[]> {
    const entities = data.map(input => Log.fromDto(new Log(), input));
    if (entities.length == 0) {
      throw ServerError.badRequest('Empty input');
    }
    try {
      const result = await super.createMany(entities);
      this.log(Action.Create, session, { _ids: result.map(r => r._id) })
      return result;
    } catch {
      throw ServerError.badRequest('Logs not created');
    }
  }
  
async update(session: User, _id: string, input: UpdateLogInput): Promise<Log> {
    const log = await this.findOne({ _id });
    if (!log) {
      throw ServerError.notFound('Log not found');
    }
    try {
      const updated = Log.fromDto(log, input);
      if (!(await this.model.updateOne({ _id }, updated)).ok) {
        throw ServerError.badRequest('Log not updated');
      }
      this.log(Action.Update, session, { _id });
      return await this.findOne({ _id });
    } catch {
      throw ServerError.badRequest('Log not updated');
    }
  }

  async deleteLog(session: User, _id: string): Promise<Log> {
    const log = await this.findOne({ _id });
    if (!log) {
      throw ServerError.notFound('Log not found');
    }
    try {
      if (!(await super.deleteOne({ _id }))) {
        throw ServerError.badRequest('Log not deleted');
      }
      this.log(Action.Delete, session, { _id });
      return log;

    } catch {
      throw ServerError.badRequest('Log not deleted');
    }
  }

  async deleteLogs(session: User, input: DeleteLogInput): Promise<Log[]> {
    const entities = await this.find({ _id: { $in: input.ids } });
    if (entities.length != input.ids.length) {
      throw ServerError.notFound('Logs not found');
    }
    try {
      if (!(await super.deleteMany({ _id: { $in: entities.map(entity => entity._id) } })).length) {
        throw ServerError.badRequest('Log not deleted');
      }
      this.log(Action.Delete, session, { ids: input.ids });
      return entities;

    } catch {
      throw ServerError.badRequest('Log not deleted');
    }
  }

// Methods
  private findOptions(input: FindLogInput) {
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

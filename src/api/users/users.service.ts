import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { BaseService, BaseServiceArgs } from 'src/common/base.service';
import { User, UserDocument } from './users.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServerError } from 'src/common/common.errors';
import { FindUserInput } from './dto/find-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { DeleteUserInput } from './dto/delete-user.input';
import { Action } from 'src/common/common.enums';
import { CreditsService } from 'src/api/credits/credits.service';
import { Credit } from '../credits/credits.type';
import { LogsService } from 'src/api/logs/logs.service';
import { Log } from '../logs/logs.type';
import { PurchasesService } from 'src/api/purchases/purchases.service';
import { Purchase } from '../purchases/purchases.type';
import { RidesService } from 'src/api/rides/rides.service';
import { Ride } from '../rides/rides.type';
// Imports


@Injectable()
export class UsersService extends BaseService<User> {

  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>,
    @Inject(forwardRef(() => CreditsService)) private readonly creditsService: CreditsService,
    @Inject(forwardRef(() => LogsService)) private readonly logsService: LogsService,
    @Inject(forwardRef(() => PurchasesService)) private readonly purchasesService: PurchasesService,
    @Inject(forwardRef(() => RidesService)) private readonly ridesService: RidesService,
    // Inject
  ) {
    super(model);
  }

  async credits(user: User): Promise<Credit[]> {
    return await this.creditsService.find({ user: user._id })
  }

  async logs(user: User): Promise<Log[]> {
    return await this.logsService.find({ user: user._id })
  }

  async purchases(user: User): Promise<Purchase[]> {
    return await this.purchasesService.find({ user: user._id })
  }

  async rides(user: User): Promise<Ride[]> {
    return await this.ridesService.find({ user: user._id })
  }

  // Resolve Fields

  public async findUser(session: User, input: FindUserInput): Promise<User> {
    const { filter, args } = this.findOptions(input);
    const user = await this.findOne(filter, args);
    if (!user) {
      throw ServerError.notFound('User not found');
    }
    return user;
  }

  public async findUsers(session: User, input: FindUserInput): Promise<User[]> {
    const { filter, args } = this.findOptions(input);
    return await this.find(filter, args);
  }

  async registerPhone(phone: string) {
    return await this.createOne(new User({ phone }));
  }

  async create(session: User, data: CreateUserInput[]): Promise<User[]> {
    const entities = data.map(input => User.fromDto(new User(), input));
    if (entities.length == 0) {
      throw ServerError.badRequest('Empty input');
    }
    try {
      const result = await super.createMany(entities);
      this.log(Action.Create, session, { _ids: result.map(r => r._id) })
      return result;
    } catch {
      throw ServerError.badRequest('Users not created');
    }
  }

  async update(session: User, _id: string, input: UpdateUserInput): Promise<User> {
    const user = await this.findOne({ _id });
    if (!user) {
      throw ServerError.notFound('User not found');
    }
    try {
      const updated = User.fromDto(user, input);
      if (!(await this.model.updateOne({ _id }, updated)).ok) {
        throw ServerError.badRequest('User not updated');
      }
      this.log(Action.Update, session, { _id });
      return await this.findOne({ _id });
    } catch {
      throw ServerError.badRequest('User not updated');
    }
  }

  async deleteUser(session: User, _id: string): Promise<User> {
    const user = await this.findOne({ _id });
    if (!user) {
      throw ServerError.notFound('User not found');
    }
    try {
      if (!(await super.deleteOne({ _id }))) {
        throw ServerError.badRequest('User not deleted');
      }
      this.log(Action.Delete, session, { _id });
      return user;

    } catch {
      throw ServerError.badRequest('User not deleted');
    }
  }

  async deleteUsers(session: User, input: DeleteUserInput): Promise<User[]> {
    const entities = await this.find({ _id: { $in: input.ids } });
    if (entities.length != input.ids.length) {
      throw ServerError.notFound('Users not found');
    }
    try {
      if (!(await super.deleteMany({ _id: { $in: entities.map(entity => entity._id) } })).length) {
        throw ServerError.badRequest('User not deleted');
      }
      this.log(Action.Delete, session, { ids: input.ids });
      return entities;

    } catch {
      throw ServerError.badRequest('User not deleted');
    }
  }

  // Methods
  private findOptions(input: FindUserInput) {
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

import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { BaseService, BaseServiceArgs } from 'src/common/base.service';
import { Purchase, PurchaseDocument } from './purchases.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServerError } from 'src/common/common.errors';
import { FindPurchaseInput } from './dto/find-purchase.input';
import { CreatePurchaseInput } from './dto/create-purchase.input';
import { UpdatePurchaseInput } from './dto/update-purchase.input';
import { DeletePurchaseInput } from './dto/delete-purchase.input';
import { Action } from 'src/common/common.enums';
import { LogsService } from 'src/api/logs/logs.service';
import { Log } from '../logs/logs.type';
import { BikesService } from 'src/api/bikes/bikes.service';
import { Bike } from '../bikes/bikes.type';
import { CreditsService } from 'src/api/credits/credits.service';
import { Credit } from '../credits/credits.type';
import { UsersService } from 'src/api/users/users.service';
// Imports
import { User } from '../users/users.type';

@Injectable()
export class PurchasesService extends BaseService<Purchase> {

  constructor(
    @InjectModel(Purchase.name) private model: Model<PurchaseDocument>,
    @Inject(forwardRef(() => LogsService)) private readonly logsService: LogsService,
    @Inject(forwardRef(() => BikesService)) private readonly bikesService: BikesService,
    @Inject(forwardRef(() => CreditsService)) private readonly creditsService: CreditsService,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
    // Inject
  ) {
    super(model);
  }

  async logs(purchase: Purchase): Promise<Log[]> {
    return await this.logsService.find({ purchase: purchase._id })
  }
  
  async bike(purchase: Purchase): Promise<Bike> {
    return await this.bikesService.findOne({ _id: purchase.bike._id });
  }
  
  async credits(purchase: Purchase): Promise<Credit> {
    return await this.creditsService.findOne({ _id: purchase.credits._id });
  }
  
  async user(purchase: Purchase): Promise<User> {
    return await this.usersService.findOne({ _id: purchase.user._id });
  }
  
  // Resolve Fields

    public async findPurchase(session: User, input: FindPurchaseInput): Promise<Purchase> {
    const { filter, args } = this.findOptions(input);
    const purchase = await this.findOne(filter, args);
    if (!purchase) {
      throw ServerError.notFound('Purchase not found');
    }
    return purchase;
  }
  
  public async findPurchases(session: User, input: FindPurchaseInput): Promise<Purchase[]> {
    const { filter, args } = this.findOptions(input);
    return await this.find(filter, args);
  }
  
async create(session: User, data: CreatePurchaseInput[]): Promise<Purchase[]> {
    const entities = data.map(input => Purchase.fromDto(new Purchase(), input));
    if (entities.length == 0) {
      throw ServerError.badRequest('Empty input');
    }
    try {
      const result = await super.createMany(entities);
      this.log(Action.Create, session, { _ids: result.map(r => r._id) })
      return result;
    } catch {
      throw ServerError.badRequest('Purchases not created');
    }
  }
  
async update(session: User, _id: string, input: UpdatePurchaseInput): Promise<Purchase> {
    const purchase = await this.findOne({ _id });
    if (!purchase) {
      throw ServerError.notFound('Purchase not found');
    }
    try {
      const updated = Purchase.fromDto(purchase, input);
      if (!(await this.model.updateOne({ _id }, updated)).ok) {
        throw ServerError.badRequest('Purchase not updated');
      }
      this.log(Action.Update, session, { _id });
      return await this.findOne({ _id });
    } catch {
      throw ServerError.badRequest('Purchase not updated');
    }
  }

  async deletePurchase(session: User, _id: string): Promise<Purchase> {
    const purchase = await this.findOne({ _id });
    if (!purchase) {
      throw ServerError.notFound('Purchase not found');
    }
    try {
      if (!(await super.deleteOne({ _id }))) {
        throw ServerError.badRequest('Purchase not deleted');
      }
      this.log(Action.Delete, session, { _id });
      return purchase;

    } catch {
      throw ServerError.badRequest('Purchase not deleted');
    }
  }

  async deletePurchases(session: User, input: DeletePurchaseInput): Promise<Purchase[]> {
    const entities = await this.find({ _id: { $in: input.ids } });
    if (entities.length != input.ids.length) {
      throw ServerError.notFound('Purchases not found');
    }
    try {
      if (!(await super.deleteMany({ _id: { $in: entities.map(entity => entity._id) } })).length) {
        throw ServerError.badRequest('Purchase not deleted');
      }
      this.log(Action.Delete, session, { ids: input.ids });
      return entities;

    } catch {
      throw ServerError.badRequest('Purchase not deleted');
    }
  }

// Methods
  private findOptions(input: FindPurchaseInput) {
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

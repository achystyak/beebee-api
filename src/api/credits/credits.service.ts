import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { BaseService, BaseServiceArgs } from 'src/common/base.service';
import { Credit, CreditDocument } from './credits.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServerError } from 'src/common/common.errors';
import { FindCreditInput } from './dto/find-credit.input';
import { CreateCreditInput } from './dto/create-credit.input';
import { UpdateCreditInput } from './dto/update-credit.input';
import { DeleteCreditInput } from './dto/delete-credit.input';
import { Action } from 'src/common/common.enums';
import { UsersService } from 'src/api/users/users.service';
import { PurchasesService } from 'src/api/purchases/purchases.service';
import { Purchase } from '../purchases/purchases.type';
// Imports
import { User } from '../users/users.type';

@Injectable()
export class CreditsService extends BaseService<Credit> {

  constructor(
    @InjectModel(Credit.name) private model: Model<CreditDocument>,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
    @Inject(forwardRef(() => PurchasesService)) private readonly purchasesService: PurchasesService,
    // Inject
  ) {
    super(model);
  }

  async user(credit: Credit): Promise<User> {
    return await this.usersService.findOne({ _id: credit.user._id });
  }
  
  async purchases(credit: Credit): Promise<Purchase[]> {
    return await this.purchasesService.find({ credits: credit._id })
  }
  
  // Resolve Fields

    public async findCredit(session: User, input: FindCreditInput): Promise<Credit> {
    const { filter, args } = this.findOptions(input);
    const credit = await this.findOne(filter, args);
    if (!credit) {
      throw ServerError.notFound('Credit not found');
    }
    return credit;
  }
  
  public async findCredits(session: User, input: FindCreditInput): Promise<Credit[]> {
    const { filter, args } = this.findOptions(input);
    return await this.find(filter, args);
  }
  
async create(session: User, data: CreateCreditInput[]): Promise<Credit[]> {
    const entities = data.map(input => Credit.fromDto(new Credit(), input));
    if (entities.length == 0) {
      throw ServerError.badRequest('Empty input');
    }
    try {
      const result = await super.createMany(entities);
      this.log(Action.Create, session, { _ids: result.map(r => r._id) })
      return result;
    } catch {
      throw ServerError.badRequest('Credits not created');
    }
  }
  
async update(session: User, _id: string, input: UpdateCreditInput): Promise<Credit> {
    const credit = await this.findOne({ _id });
    if (!credit) {
      throw ServerError.notFound('Credit not found');
    }
    try {
      const updated = Credit.fromDto(credit, input);
      if (!(await this.model.updateOne({ _id }, updated)).ok) {
        throw ServerError.badRequest('Credit not updated');
      }
      this.log(Action.Update, session, { _id });
      return await this.findOne({ _id });
    } catch {
      throw ServerError.badRequest('Credit not updated');
    }
  }

  async deleteCredit(session: User, _id: string): Promise<Credit> {
    const credit = await this.findOne({ _id });
    if (!credit) {
      throw ServerError.notFound('Credit not found');
    }
    try {
      if (!(await super.deleteOne({ _id }))) {
        throw ServerError.badRequest('Credit not deleted');
      }
      this.log(Action.Delete, session, { _id });
      return credit;

    } catch {
      throw ServerError.badRequest('Credit not deleted');
    }
  }

  async deleteCredits(session: User, input: DeleteCreditInput): Promise<Credit[]> {
    const entities = await this.find({ _id: { $in: input.ids } });
    if (entities.length != input.ids.length) {
      throw ServerError.notFound('Credits not found');
    }
    try {
      if (!(await super.deleteMany({ _id: { $in: entities.map(entity => entity._id) } })).length) {
        throw ServerError.badRequest('Credit not deleted');
      }
      this.log(Action.Delete, session, { ids: input.ids });
      return entities;

    } catch {
      throw ServerError.badRequest('Credit not deleted');
    }
  }

// Methods
  private findOptions(input: FindCreditInput) {
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

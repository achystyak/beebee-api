import { User } from "../users/users.type";
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base.entity';
import { Purchase } from "../purchases/purchases.type";
// Imports


@ObjectType()
@Schema({ collection: 'credits', timestamps: true })
export class Credit extends BaseEntity {

  constructor(args?: any) {
    super();
    Object.assign(this, args)
  }

  @Field(() => String, { nullable: true })
  @Prop({ type: () => String, required: false })
  @ApiProperty({ type: () => String, required: false })
  cardNumber?: String;

  @Field(() => String, { nullable: true })
  @Prop({ type: () => String, required: false })
  @ApiProperty({ type: () => String, required: false })
  cardToken?: String;

  @Field(() => User, { nullable: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  @ApiProperty({ type: () => User, required: true })
  user?: User;

  @Field(() => [Purchase], { nullable: false })    
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' }], default: [] })
  @ApiProperty({ type: () => [Purchase], required: false })
  purchases?: Purchase[];

// Props
}

export type CreditDocument = Credit & mongoose.Document;
export const CreditSchema = SchemaFactory.createForClass(Credit);

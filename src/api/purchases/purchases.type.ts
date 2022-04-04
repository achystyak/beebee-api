import { User } from "../users/users.type";

import { Bike } from "../bikes/bikes.type";

import { Credit } from "../credits/credits.type";
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base.entity';
import { Log } from "../logs/logs.type";
// Imports


@ObjectType()
@Schema({ collection: 'purchases', timestamps: true })
export class Purchase extends BaseEntity {

  constructor(args?: any) {
    super();
    Object.assign(this, args)
  }

  @Field(() => String, { nullable: true })
  @Prop({ type: () => String, required: false })
  @ApiProperty({ type: () => String, required: false })
  ride?: String;

  @Field(() => Date, { nullable: true })
  @Prop({ type: () => Date, required: false })
  @ApiProperty({ type: () => Date, required: false })
  date?: Date;

  @Field(() => Boolean, { nullable: true })
  @Prop({ type: () => Boolean, required: false })
  @ApiProperty({ type: () => Boolean, required: false })
  approved?: Boolean;

  @Field(() => Number, { nullable: true })
  @Prop({ type: () => Number, required: false })
  @ApiProperty({ type: () => Number, required: false })
  total?: Number;

  @Field(() => String, { nullable: true })
  @Prop({ type: () => String, required: false })
  @ApiProperty({ type: () => String, required: false })
  type?: String;

  @Field(() => [Log], { nullable: false })    
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Log' }], default: [] })
  @ApiProperty({ type: () => [Log], required: false })
  logs?: Log[];

  @Field(() => Bike, { nullable: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Bike', required: true })
  @ApiProperty({ type: () => Bike, required: true })
  bike?: Bike;

  @Field(() => Credit, { nullable: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Credit', required: true })
  @ApiProperty({ type: () => Credit, required: true })
  credits?: Credit;

  @Field(() => User, { nullable: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  @ApiProperty({ type: () => User, required: true })
  user?: User;

// Props
}

export type PurchaseDocument = Purchase & mongoose.Document;
export const PurchaseSchema = SchemaFactory.createForClass(Purchase);

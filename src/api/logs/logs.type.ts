import { User } from "../users/users.type";

import { Ride } from "../rides/rides.type";

import { Purchase } from "../purchases/purchases.type";
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base.entity';
// Imports


@ObjectType()
@Schema({ collection: 'logs', timestamps: true })
export class Log extends BaseEntity {

  constructor(args?: any) {
    super();
    Object.assign(this, args)
  }

  @Field(() => String, { nullable: true })
  @Prop({ type: () => String, required: false })
  @ApiProperty({ type: () => String, required: false })
  type?: String;

  @Field(() => String, { nullable: true })
  @Prop({ type: () => String, required: false })
  @ApiProperty({ type: () => String, required: false })
  bike?: String;

  @Field(() => String, { nullable: true })
  @Prop({ type: () => String, required: false })
  @ApiProperty({ type: () => String, required: false })
  credits?: String;

  @Field(() => Date, { nullable: true })
  @Prop({ type: () => Date, required: false })
  @ApiProperty({ type: () => Date, required: false })
  date?: Date;

  @Field(() => Purchase, { nullable: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase', required: true })
  @ApiProperty({ type: () => Purchase, required: true })
  purchase?: Purchase;

  @Field(() => Ride, { nullable: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true })
  @ApiProperty({ type: () => Ride, required: true })
  ride?: Ride;

  @Field(() => User, { nullable: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  @ApiProperty({ type: () => User, required: true })
  user?: User;

// Props
}

export type LogDocument = Log & mongoose.Document;
export const LogSchema = SchemaFactory.createForClass(Log);

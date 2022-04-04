import { User } from "../users/users.type";

import { Bike } from "../bikes/bikes.type";
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base.entity';
import { Log } from "../logs/logs.type";
// Imports
@ObjectType()
@Schema()
export class RideRoute {

 constructor(args?: any) {
  Object.assign(this, args);
 } 

    @Field(() => Date, { nullable: true })
  @Prop({ type: () => Date, required: false })
  @ApiProperty({ type: () => Date, required: false })
  date?: Date;

  @Field(() => Number, { nullable: true })
  @Prop({ type: () => Number, required: false })
  @ApiProperty({ type: () => Number, required: false })
  lat?: Number;

  @Field(() => Number, { nullable: true })
  @Prop({ type: () => Number, required: false })
  @ApiProperty({ type: () => Number, required: false })
  lon?: Number;

}

@ObjectType()
@Schema({ collection: 'rides', timestamps: true })
export class Ride extends BaseEntity {

  constructor(args?: any) {
    super();
    Object.assign(this, args)
  }

  @Field(() => Date, { nullable: true })
  @Prop({ type: () => Date, required: false })
  @ApiProperty({ type: () => Date, required: false })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  @Prop({ type: () => Date, required: false })
  @ApiProperty({ type: () => Date, required: false })
  finishDate?: Date;

  @Field(() => [RideRoute], { nullable: true })
  @Prop({ type: () => [RideRoute], required: false })
  @ApiProperty({ type: () => [RideRoute], required: false })
  route?: RideRoute[];

  @Field(() => [Log], { nullable: false })    
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Log' }], default: [] })
  @ApiProperty({ type: () => [Log], required: false })
  logs?: Log[];

  @Field(() => Bike, { nullable: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Bike', required: true })
  @ApiProperty({ type: () => Bike, required: true })
  bike?: Bike;

  @Field(() => User, { nullable: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  @ApiProperty({ type: () => User, required: true })
  user?: User;

// Props
}

export type RideDocument = Ride & mongoose.Document;
export const RideSchema = SchemaFactory.createForClass(Ride);

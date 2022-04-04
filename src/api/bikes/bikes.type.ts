import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base.entity';
import { Purchase } from "../purchases/purchases.type";
import { Ride } from "../rides/rides.type";
// Imports
@ObjectType()
@Schema()
export class BikeLocation {

  constructor(args?: any) {
    Object.assign(this, args);
  }

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
@Schema()
export class BikeBattery {

  constructor(args?: any) {
    Object.assign(this, args);
  }

  @Field(() => Number, { nullable: true })
  @Prop({ type: () => Number, required: false })
  @ApiProperty({ type: () => Number, required: false })
  level?: Number;

}

@ObjectType()
@Schema({ collection: 'bikes', timestamps: true })
export class Bike extends BaseEntity {

  constructor(args?: any) {
    super();
    Object.assign(this, args)
  }

  @Field(() => String, { nullable: true })
  @Prop({ type: () => String, required: false })
  @ApiProperty({ type: () => String, required: false })
  code?: String;

  @Field(() => BikeBattery, { nullable: true })
  @Prop({ type: () => BikeBattery, required: false })
  @ApiProperty({ type: () => BikeBattery, required: false })
  battery?: BikeBattery;

  @Field(() => BikeLocation, { nullable: true })
  @Prop({ type: () => BikeLocation, required: false })
  @ApiProperty({ type: () => BikeLocation, required: false })
  location?: BikeLocation;

  @Field(() => String, { nullable: true })
  @Prop({ type: () => String, required: false })
  @ApiProperty({ type: () => String, required: false })
  status?: String;

  @Field(() => [Purchase], { nullable: false })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' }], default: [] })
  @ApiProperty({ type: () => [Purchase], required: false })
  purchases?: Purchase[];

  @Field(() => [Ride], { nullable: false })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ride' }], default: [] })
  @ApiProperty({ type: () => [Ride], required: false })
  rides?: Ride[];

  // Props
}

export type BikeDocument = Bike & mongoose.Document;
export const BikeSchema = SchemaFactory.createForClass(Bike);

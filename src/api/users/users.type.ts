import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base.entity';
import { Credit } from "../credits/credits.type";
import { Log } from "../logs/logs.type";
import { Purchase } from "../purchases/purchases.type";
import { Ride } from "../rides/rides.type";
// Imports


@ObjectType()
@Schema({ collection: 'users', timestamps: true })
export class User extends BaseEntity {

  constructor(args?: any) {
    super();
    Object.assign(this, args)
  }

  @Field(() => String, { nullable: true })
  @Prop({ type: () => String, required: false })
  @ApiProperty({ type: () => String, required: false })
  password?: String;

  @Field(() => String, { nullable: true })
  @Prop({ type: () => String, required: false })
  @ApiProperty({ type: () => String, required: false })
  phone?: String;

  @Field(() => String, { nullable: true })
  @Prop({ type: () => String, required: false })
  @ApiProperty({ type: () => String, required: false })
  firstName?: String;

  @Field(() => String, { nullable: true })
  @Prop({ type: () => String, required: false })
  @ApiProperty({ type: () => String, required: false })
  lastName?: String;

  @Field(() => Date, { nullable: true })
  @Prop({ type: () => Date, required: false })
  @ApiProperty({ type: () => Date, required: false })
  lastActiveAt?: Date;

  @Field(() => [String], { nullable: true })
  @Prop({ type: () => [String], required: false })
  @ApiProperty({ type: () => [String], required: false })
  pushTokens?: String[];

  @Field(() => String, { nullable: true })
  @Prop({ type: () => String, required: false })
  @ApiProperty({ type: () => String, required: false })
  email?: String;

  @Field(() => [Credit], { nullable: false })    
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Credit' }], default: [] })
  @ApiProperty({ type: () => [Credit], required: false })
  credits?: Credit[];

  @Field(() => [Log], { nullable: false })    
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Log' }], default: [] })
  @ApiProperty({ type: () => [Log], required: false })
  logs?: Log[];

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

export type UserDocument = User & mongoose.Document;
export const UserSchema = SchemaFactory.createForClass(User);

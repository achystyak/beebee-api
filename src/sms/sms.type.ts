import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/common/base.entity";
import * as mongoose from 'mongoose';
import { User } from "src/api/users/users.type";

@ObjectType()
@Schema({ collection: 'sms', timestamps: true })
export class Sms extends BaseEntity {

    constructor(args?: any) {
        super();
        Object.assign(this, args)
    }

    @Field(() => String, { nullable: false })
    @Prop({ type: () => String, required: false })
    @ApiProperty({ type: () => String, required: false })
    code: String;

    @Field(() => Boolean, { defaultValue: false })
    @Prop({ type: () => Boolean, default: false })
    @ApiProperty({ type: () => Boolean, default: false })
    verified: boolean;

    @Field(() => String, { nullable: false })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: User;

}

export type SmsDocument = Sms & mongoose.Document;
export const SmsSchema = SchemaFactory.createForClass(Sms);

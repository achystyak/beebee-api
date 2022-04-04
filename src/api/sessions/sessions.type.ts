import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BaseEntity } from "../../common/base.entity"
import { User } from '../users/users.type';

@Schema({ collection: "sessions", timestamps: true })
export class Session extends BaseEntity {

    constructor(args?: Session) {
        super()
        Object.assign(this, args)
    }

    @Prop({ required: false })
    secret: string;

    @Prop({ required: false, default: () => false })
    expired: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false })
    user: User;
}

export type SessionDocument = Session & mongoose.Document;
export const SessionSchema = SchemaFactory.createForClass(Session);
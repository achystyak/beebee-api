import { Field } from "@nestjs/graphql";
import { Prop } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger";

export class BaseEntity {

    @Field({ nullable: true })
    @Prop({ required: false })
    @ApiProperty({ required: false })
    _id?: string;

    @Field(() => Date, { nullable: true })
    @Prop({ required: true })
    @ApiProperty({ type: () => Date, required: false })
    createdAt?: Date;

    @Field(() => Date, { nullable: true })
    @Prop({ required: false })
    @ApiProperty({ type: () => Date, required: false })
    updatedAt?: Date;

    @Field(() => Date, { nullable: true })
    @Prop({ required: false })
    @ApiProperty({ type: () => Date, required: false })
    deletedAt?: Date;

    // Convert

    public static fromDto<Type extends BaseEntity>(type: Type, args: any): Type {
        if (type && args) {
            for (const prop in args) {
                const value = args[prop] ?? type[prop]
                type[prop] = value
            }
        }
        return type as Type
    }
}
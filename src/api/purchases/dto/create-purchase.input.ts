import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreatePurchaseInput {

  constructor(args?: CreatePurchaseInput) {
    Object.assign(this, args);
  }

  @Field(() => String, { nullable: true })
  @ApiProperty({ type: () => String, required: false })
  @IsOptional()
  @IsString()
  ride?: String;

  @Field(() => Date, { nullable: true })
  @ApiProperty({ type: () => Date, required: false })
  @IsOptional()
  @IsDate()
  date?: Date;

  @Field(() => Boolean, { nullable: true })
  @ApiProperty({ type: () => Boolean, required: false })
  @IsOptional()
  @IsObject()
  approved?: Boolean;

  @Field(() => Number, { nullable: true })
  @ApiProperty({ type: () => Number, required: false })
  @IsOptional()
  @IsNumber()
  total?: Number;

  @Field(() => String, { nullable: true })
  @ApiProperty({ type: () => String, required: false })
  @IsOptional()
  @IsString()
  type?: String;
}

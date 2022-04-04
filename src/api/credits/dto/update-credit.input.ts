import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsMongoId, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateCreditInput {

  constructor(args?: UpdateCreditInput) {
    Object.assign(this, args);
  }

  @Field()
  @ApiProperty({ required: true })
  @IsMongoId()
  id: String

  @Field(() => String, { nullable: true })
  @ApiProperty({ type: () => String, required: false })
  @IsOptional()
  @IsString()
  cardNumber?: String;

  @Field(() => String, { nullable: true })
  @ApiProperty({ type: () => String, required: false })
  @IsOptional()
  @IsString()
  cardToken?: String;
}

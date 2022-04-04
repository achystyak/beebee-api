import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteCreditInput {

  constructor(args?: DeleteCreditInput) {
    Object.assign(this, args);
  }

  @Field(() => [String], { nullable: true })
  @ApiProperty({ type: () => [String], required: true })
  @IsArray()
  @IsNotEmpty()
  @IsMongoId({ each: true })
  ids?: string[];
}
import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteLogInput {

  constructor(args?: DeleteLogInput) {
    Object.assign(this, args);
  }

  @Field(() => [String], { nullable: true })
  @ApiProperty({ type: () => [String], required: true })
  @IsArray()
  @IsNotEmpty()
  @IsMongoId({ each: true })
  ids?: string[];
}
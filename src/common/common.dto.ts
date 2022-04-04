import { Field, InputType, Int } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class PaginatedDto {

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Int, nullable: true, required: false })
  skip?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Int, nullable: true, required: false })
  limit?: number;
}

@InputType()
export class PublisherAuthInput {

  @Field()
  @IsString()
  @IsNotEmpty()
  token: string;

  @Field(() => [String])
  @IsArray()
  @IsOptional()
  @ApiProperty({ type: Int, nullable: true, required: false })
  ids: string[];
}
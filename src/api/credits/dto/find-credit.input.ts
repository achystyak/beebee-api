import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { PaginatedDto } from 'src/common/common.dto';

@InputType()
export class FindCreditInput {

  constructor(args?: FindCreditInput) {
    Object.assign(this, args);
  }

  @Field(() => PaginatedDto, { nullable: true })
  @ApiProperty({ type: () => PaginatedDto, required: false })
  @IsObject()
  @IsOptional()
  pagination?: PaginatedDto;

  @Field(() => String, { nullable: true })
  @ApiProperty({ type: () => String, required: false })
  @IsString()
  @IsOptional()
  search?: string;


}

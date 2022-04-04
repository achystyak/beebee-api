import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateBikeInput {

  constructor(args?: CreateBikeInput) {
    Object.assign(this, args);
  }

  @Field(() => String, { nullable: true })
  @ApiProperty({ type: () => String, required: false })
  @IsOptional()
  @IsString()
  code?: String;

  @Field(() => String, { nullable: true })
  @ApiProperty({ type: () => String, required: false })
  @IsOptional()
  @IsString()
  status?: String;
}

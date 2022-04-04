import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateRideInput {

  constructor(args?: CreateRideInput) {
    Object.assign(this, args);
  }

  @Field(() => Date, { nullable: true })
  @ApiProperty({ type: () => Date, required: false })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  @ApiProperty({ type: () => Date, required: false })
  @IsOptional()
  @IsDate()
  finishDate?: Date;
}

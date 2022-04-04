import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsMongoId, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateRideInput {

  constructor(args?: UpdateRideInput) {
    Object.assign(this, args);
  }

  @Field()
  @ApiProperty({ required: true })
  @IsMongoId()
  id: String

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

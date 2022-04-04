import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsMongoId, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateLogInput {

  constructor(args?: UpdateLogInput) {
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
  type?: String;

  @Field(() => String, { nullable: true })
  @ApiProperty({ type: () => String, required: false })
  @IsOptional()
  @IsString()
  bike?: String;

  @Field(() => String, { nullable: true })
  @ApiProperty({ type: () => String, required: false })
  @IsOptional()
  @IsString()
  credits?: String;

  @Field(() => Date, { nullable: true })
  @ApiProperty({ type: () => Date, required: false })
  @IsOptional()
  @IsDate()
  date?: Date;
}

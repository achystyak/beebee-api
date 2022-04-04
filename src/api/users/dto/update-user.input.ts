import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsMongoId, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {

  constructor(args?: UpdateUserInput) {
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
  password?: String;

  @Field(() => String, { nullable: true })
  @ApiProperty({ type: () => String, required: false })
  @IsOptional()
  @IsString()
  phone?: String;

  @Field(() => String, { nullable: true })
  @ApiProperty({ type: () => String, required: false })
  @IsOptional()
  @IsString()
  firstName?: String;

  @Field(() => String, { nullable: true })
  @ApiProperty({ type: () => String, required: false })
  @IsOptional()
  @IsString()
  lastName?: String;

  @Field(() => Date, { nullable: true })
  @ApiProperty({ type: () => Date, required: false })
  @IsOptional()
  @IsDate()
  lastActiveAt?: Date;

  @Field(() => String, { nullable: true })
  @ApiProperty({ type: () => String, required: false })
  @IsOptional()
  @IsArray()
  pushTokens?: String[];

  @Field(() => String, { nullable: true })
  @ApiProperty({ type: () => String, required: false })
  @IsOptional()
  @IsString()
  email?: String;
}

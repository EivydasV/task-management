import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Field, HideField, InputType } from '@nestjs/graphql';
import { PRIORITIES, STATUS } from '../schema/task.schema';
import { EntityExists } from '../../common/validators/is-unique.validator';
import { User } from '../../user/schema/user.schema';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  subject!: string;

  @Field()
  @MaxLength(2000)
  @IsString()
  @IsOptional()
  description!: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(PRIORITIES)
  priority!: PRIORITIES;

  @Field()
  @EntityExists(User.name, '_id', true)
  @IsNotEmpty()
  @IsMongoId()
  assignedTo!: string;

  @EntityExists(User.name, '_id', true)
  @Field()
  @IsNotEmpty()
  @IsMongoId()
  reporter!: string;

  @Field()
  @IsOptional()
  @IsMongoId()
  parentTask?: string;

  @Field()
  @IsMongoId()
  team?: string;

  @Field(() => STATUS)
  @IsNotEmpty()
  @IsEnum(STATUS)
  status!: STATUS;

  @HideField()
  createdBy!: string;
}

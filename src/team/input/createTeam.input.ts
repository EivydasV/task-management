import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Field, HideField, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTeamInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  name!: string;

  @HideField()
  createdBy!: string;
}

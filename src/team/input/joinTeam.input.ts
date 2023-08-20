import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Field, HideField, InputType } from '@nestjs/graphql';

@InputType()
export class JoinTeamInput {
  @Field()
  @IsNotEmpty()
  @IsMongoId()
  team!: string;

  @HideField()
  member!: string;
}

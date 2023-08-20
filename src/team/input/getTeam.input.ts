import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetTeamInput {
  @Field()
  @IsNotEmpty()
  @IsMongoId()
  team!: string;
}

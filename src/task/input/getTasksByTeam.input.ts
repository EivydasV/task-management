import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class GetTasksByTeamInput {
  @Field()
  @IsNotEmpty()
  @IsMongoId()
  team!: string;
}

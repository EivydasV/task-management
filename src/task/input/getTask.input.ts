import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class GetTaskInput {
  @Field()
  @IsNotEmpty()
  @IsMongoId()
  id!: string;
}

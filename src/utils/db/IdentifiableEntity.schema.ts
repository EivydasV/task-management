import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export abstract class IdentifiableEntitySchema {
  @Field()
  _id?: string;
}

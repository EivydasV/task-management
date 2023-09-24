import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { IdentifiableEntitySchema } from '../../utils/db/IdentifiableEntity.schema';

export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true })
@ObjectType()
export class User extends IdentifiableEntitySchema {
  @Field()
  @Prop({ required: true, maxlength: 100 })
  firstName!: string;

  @Field()
  @Prop({ required: true, maxlength: 100 })
  lastName!: string;

  @Field()
  @Prop({ required: true, maxlength: 100, unique: true })
  email!: string;

  @Prop({ required: true, maxlength: 150 })
  password!: string;

  @Field()
  @Prop({ required: true, maxlength: 100 })
  role!: string;
}
export const UserSchema = SchemaFactory.createForClass(User);

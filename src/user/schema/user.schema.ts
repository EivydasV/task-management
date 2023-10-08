import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { IdentifiableEntitySchema } from '../../utils/db/IdentifiableEntity.schema';
import { CursorPaginated } from '../../utils/graphql/mongo/pagination/cursorPagination.args';
import { OffsetPaginated } from '../../utils/graphql/mongo/pagination/offsetPagination.args';

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

  @Prop({ required: false })
  passwordResetToken?: string;

  @Prop({ required: false })
  passwordResetTokenExpiresAt?: Date;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}

@ObjectType()
export class CursorPaginatedUser extends CursorPaginated(User) {}

@ObjectType()
export class OffsetPaginatedUser extends OffsetPaginated(User) {}

export const UserSchema = SchemaFactory.createForClass(User);

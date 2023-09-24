import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from '../../utils/db/IdentifiableEntity.schema';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/schema/user.schema';

export type TeamDocument = HydratedDocument<Team>;

@Schema({ timestamps: true })
@ObjectType()
export class Team extends IdentifiableEntitySchema {
  @Field()
  @Prop({ required: true, maxlength: 100 })
  name!: string;

  @Field(() => User)
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  createdBy!: User | string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);

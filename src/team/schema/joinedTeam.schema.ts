import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from '../../utils/db/IdentifiableEntity.schema';
import { Field, ObjectType } from '@nestjs/graphql';
import { Team } from './team.schema';
import { User } from '../../user/schema/user.schema';

export type JoinedTeamDocument = HydratedDocument<JoinedTeam>;

@Schema({ timestamps: true })
@ObjectType()
export class JoinedTeam extends IdentifiableEntitySchema {
  @Field(() => Team)
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Team.name,
  })
  team!: Team | string;

  @Field(() => User)
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  member!: User | string;
}

export const JoinedTeamSchema = SchemaFactory.createForClass(JoinedTeam);

import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from '../../utils/db/IdentifiableEntity.schema';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/schema/user.schema';
import { Team } from './team.schema';

export type JoinedTeamsDocument = HydratedDocument<JoinedTeams>;

@Schema({ timestamps: true })
@ObjectType()
export class JoinedTeams extends IdentifiableEntitySchema {
  @Field()
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Team.name,
  })
  team!: Team;

  @Field()
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  member!: User;
}

export const JoinedTeamsSchema = SchemaFactory.createForClass(JoinedTeams);

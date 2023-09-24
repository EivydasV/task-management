import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from '../../utils/db/IdentifiableEntity.schema';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Team } from '../../team/schema/team.schema';
import { User } from '../../user/schema/user.schema';

export type TaskDocument = HydratedDocument<Task>;

export enum STATUS {
  BACKLOG = 'BACKLOG',
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  CODE_REVIEW = 'CODE_REVIEW',
  QA = 'QA',
  DONE = 'DONE',
}

export enum PRIORITIES {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

registerEnumType(STATUS, {
  name: 'STATUS',
});

registerEnumType(PRIORITIES, {
  name: 'PRIORITIES',
});

@Schema({ timestamps: true })
@ObjectType()
export class Task extends IdentifiableEntitySchema {
  @Field()
  @Prop({ required: true, maxlength: 100 })
  subject!: string;

  @Field({ nullable: true })
  @Prop({ required: false, maxlength: 2000 })
  description?: string;

  @Field()
  @Prop({ required: true, enum: PRIORITIES })
  priority!: PRIORITIES;

  @Field(() => User)
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  assignedTo!: User | string;

  @Field(() => User)
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  createdBy!: User | string;

  @Field(() => User)
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  reporter!: User | string;

  @Field(() => Task, { nullable: true })
  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: Task.name,
  })
  parentTask?: Task | string;

  @Field(() => Task)
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Team.name,
  })
  team!: Team | string;

  @Field(() => [String])
  @Prop({ type: [String] })
  attachments?: string[];

  @Field()
  @Prop({ required: true, enum: STATUS, default: STATUS.BACKLOG })
  status!: STATUS;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

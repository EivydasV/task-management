import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Task, TaskDocument } from './schema/task.schema';
import { CreateTaskInput } from './input/createTask.input';
import { TaskService } from './task.service';
import { AuthId } from '../auth/decorator/authId.decorator';
import { UserService } from '../user/user.service';
import { GetTasksByTeamInput } from './input/getTasksByTeam.input';
import { GetTaskInput } from './input/getTask.input';
import { User } from '../user/schema/user.schema';
import { Team } from '../team/schema/team.schema';

@Resolver(() => Task)
export class TaskResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Task)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
    @AuthId() authId: string,
  ): Promise<Task> {
    return this.taskService.create({ ...createTaskInput, createdBy: authId });
  }

  @Query(() => Task, { nullable: true })
  async getTask(
    @Args('getTaskInput') { id }: GetTaskInput,
  ): Promise<TaskDocument | null> {
    return await this.taskService.getTaskById(id);
  }

  @Query(() => [Task])
  async getTasksByTeam(
    @Args('team') team: GetTasksByTeamInput,
  ): Promise<TaskDocument[]> {
    return await this.taskService.getTasks({ team: team.team });
  }

  @ResolveField()
  async createdBy(@Parent() task: TaskDocument): Promise<User | null> {
    const { createdBy } = await task.populate('createdBy');

    return createdBy;
  }

  @ResolveField()
  async assignedTo(@Parent() task: TaskDocument): Promise<User | null> {
    const { assignedTo } = await task.populate('assignedTo');

    return assignedTo;
  }

  @ResolveField()
  async reporter(@Parent() task: TaskDocument): Promise<User | null> {
    const { reporter } = await task.populate('reporter');

    return reporter;
  }

  @ResolveField()
  async parentTask(@Parent() task: TaskDocument): Promise<Task | undefined> {
    const popTask = await task.populate('parentTask');

    return popTask?.parentTask;
  }

  @ResolveField()
  async team(@Parent() task: TaskDocument): Promise<Team | null> {
    const { team } = await task.populate('team');

    return team;
  }
}

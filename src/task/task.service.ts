import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskInput } from './input/createTask.input';
import { CreateTaskCommand } from './command/createTask.command';
import { Task, TaskDocument } from './schema/task.schema';
import { GetTaskByIdQuery } from './query/getTaskById.query';
import { GetTasksQuery } from './query/getTasks.query';
import { FilterQuery } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  async create(createTaskDto: CreateTaskInput) {
    return this.commandBus.execute<CreateTaskCommand, Task>(
      new CreateTaskCommand(createTaskDto),
    );
  }

  async getTaskById(id: string) {
    return this.queryBus.execute<GetTaskByIdQuery, TaskDocument | null>(
      new GetTaskByIdQuery(id),
    );
  }

  async getTasks(filter: FilterQuery<Task>) {
    return this.queryBus.execute<GetTasksQuery, TaskDocument[]>(
      new GetTasksQuery(filter),
    );
  }
}

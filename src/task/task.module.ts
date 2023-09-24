import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { Task, TaskSchema } from './schema/task.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTaskHandler } from './handler/command/createTask.handler';
import { GetTaskByIdHandler } from './handler/query/GetTaskById.handler';
import { GetTasksHandler } from './handler/query/GetTasks.handler';
import { UserModule } from '../user/user.module';
import { TaskRepository } from './repository/task.repository';

export const commandHandlers = [CreateTaskHandler];

export const queryHandlers = [GetTaskByIdHandler, GetTasksHandler];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    UserModule,
  ],
  providers: [
    TaskService,
    TaskResolver,
    TaskRepository,
    ...commandHandlers,
    ...queryHandlers,
  ],
})
export class TaskModule {}

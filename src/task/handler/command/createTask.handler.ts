import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskCommand } from '../../command/createTask.command';
import { Task } from '../../schema/task.schema';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async execute({ task }: CreateTaskCommand) {
    return this.taskModel.create(task);
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateTaskCommand } from '../../command/createTask.command';
import { TaskRepository } from '../../repository/task.repository';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ task }: CreateTaskCommand) {
    return this.taskRepository.create(task);
  }
}

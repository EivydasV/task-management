import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTaskByIdQuery } from '../../query/getTaskById.query';
import { TaskRepository } from '../../repository/task.repository';

@QueryHandler(GetTaskByIdQuery)
export class GetTaskByIdHandler implements IQueryHandler<GetTaskByIdQuery> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ id }: GetTaskByIdQuery) {
    return this.taskRepository.findById(id);
  }
}

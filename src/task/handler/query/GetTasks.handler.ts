import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTasksQuery } from '../../query/getTasks.query';
import { TaskRepository } from '../../repository/task.repository';

@QueryHandler(GetTasksQuery)
export class GetTasksHandler implements IQueryHandler<GetTasksQuery> {
  constructor(private readonly taskRepository: TaskRepository) {}
  async execute({ filter }: GetTasksQuery) {
    return this.taskRepository.findAll(filter);
  }
}

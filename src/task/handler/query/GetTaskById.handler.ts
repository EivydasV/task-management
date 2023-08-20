import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetTaskByIdQuery } from '../../query/getTaskById.query';
import { Task } from '../../schema/task.schema';

@QueryHandler(GetTaskByIdQuery)
export class GetTaskByIdHandler implements IQueryHandler<GetTaskByIdQuery> {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async execute({ id }: GetTaskByIdQuery) {
    return this.taskModel.findById(id);
  }
}

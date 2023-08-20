import { FilterQuery } from 'mongoose';
import { Task } from '../schema/task.schema';

export class GetTasksQuery {
  constructor(public readonly filter: FilterQuery<Task>) {}
}

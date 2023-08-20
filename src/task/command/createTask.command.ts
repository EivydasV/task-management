import { CreateTaskInput } from '../input/createTask.input';

export class CreateTaskCommand {
  constructor(public readonly task: CreateTaskInput) {}
}

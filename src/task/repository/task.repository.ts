import { Injectable } from '@nestjs/common';
import { Task, TaskDocument } from '../schema/task.schema';
import { MongoRepository } from '../../common/repository/mongo.repository';

@Injectable()
export class TaskRepository extends MongoRepository<TaskDocument, Task>(Task) {}

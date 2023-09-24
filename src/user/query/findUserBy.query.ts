import { FilterQuery } from 'mongoose';
import { User } from '../schema/user.schema';

export class FindUserByQuery {
  constructor(public readonly filter: FilterQuery<User>) {}
}

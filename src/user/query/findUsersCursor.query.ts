import { FilterQuery } from 'mongoose';
import { User } from '../schema/user.schema';
import { CursorPaginationArgs } from '../../utils/graphql/mongo/pagination/cursorPagination.args';
import { CursorPaginationParam } from '../../common/pipes/cursorPagination.pipe';

export class FindUsersCursorQuery {
  constructor(public readonly filter: CursorPaginationParam<User>) {}
}

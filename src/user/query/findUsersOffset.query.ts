import { User } from '../schema/user.schema';
import { OffsetPaginationParam } from '../../common/pipes/offsetPagination.pipe';

export class FindUsersOffsetQuery {
  constructor(public readonly filter: OffsetPaginationParam<User>) {}
}

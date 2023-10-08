import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../repository/user.repository';
import { FindUsersCursorQuery } from '../../query/findUsersCursor.query';
import { CursorPaginatedUser } from '../../schema/user.schema';

@QueryHandler(FindUsersCursorQuery)
export class FindUsersCursorHandler
  implements IQueryHandler<FindUsersCursorQuery>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    filter,
  }: FindUsersCursorQuery): Promise<CursorPaginatedUser> {
    return await this.userRepository.cursorPaginate(filter);
  }
}

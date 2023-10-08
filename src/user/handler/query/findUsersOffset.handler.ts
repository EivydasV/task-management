import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../repository/user.repository';
import { OffsetPaginatedUser } from '../../schema/user.schema';
import { FindUsersOffsetQuery } from '../../query/findUsersOffset.query';

@QueryHandler(FindUsersOffsetQuery)
export class FindUsersOffsetHandler
  implements IQueryHandler<FindUsersOffsetQuery>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    filter,
  }: FindUsersOffsetQuery): Promise<OffsetPaginatedUser> {
    return await this.userRepository.offsetPaginate(filter);
  }
}

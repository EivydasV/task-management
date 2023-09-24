import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserByQuery } from '../../query/findUserBy.query';
import { UserRepository } from '../../repository/user.repository';

@QueryHandler(FindUserByQuery)
export class FindUserByHandler implements IQueryHandler<FindUserByQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ filter }: FindUserByQuery) {
    return this.userRepository.findOne(filter);
  }
}

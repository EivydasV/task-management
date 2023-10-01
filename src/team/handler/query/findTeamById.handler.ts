import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindTeamByIdQuery } from '../../query/findTeamById.query';
import { TeamRepository } from '../../repository/team.repository';

@QueryHandler(FindTeamByIdQuery)
export class FindTeamByIdHandler implements IQueryHandler<FindTeamByIdQuery> {
  constructor(private readonly teamRepository: TeamRepository) {}

  async execute({ id }: FindTeamByIdQuery) {
    return this.teamRepository.findById(id);
  }
}

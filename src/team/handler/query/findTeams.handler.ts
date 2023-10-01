import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FilterQuery } from 'mongoose';
import { FindTeamsQuery } from '../../query/findTeams.query';
import { Team } from '../../schema/team.schema';
import { TeamRepository } from '../../repository/team.repository';

@QueryHandler(FindTeamsQuery)
export class FindTeamsHandler implements IQueryHandler<FindTeamsQuery> {
  constructor(private readonly teamRepository: TeamRepository) {}

  async execute({ filter }: FilterQuery<Team>) {
    return this.teamRepository.findAll(filter);
  }
}

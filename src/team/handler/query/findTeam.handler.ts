import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FilterQuery } from 'mongoose';
import { Team } from '../../schema/team.schema';
import { FindTeamQuery } from '../../query/findTeam.query';
import { TeamRepository } from '../../repository/team.repository';

@QueryHandler(FindTeamQuery)
export class FindTeamHandler implements IQueryHandler<FindTeamQuery> {
  constructor(private readonly teamRepository: TeamRepository) {}

  async execute({ filter }: FilterQuery<Team>) {
    return this.teamRepository.findOne(filter);
  }
}

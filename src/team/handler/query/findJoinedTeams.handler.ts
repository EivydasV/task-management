import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FilterQuery } from 'mongoose';
import { JoinedTeam } from '../../schema/joinedTeam.schema';
import { FindJoinedTeamsQuery } from '../../query/findJoinedTeams.query';
import { TeamRepository } from '../../repository/team.repository';

@QueryHandler(FindJoinedTeamsQuery)
export class FindJoinedTeamsHandler
  implements IQueryHandler<FindJoinedTeamsQuery>
{
  constructor(private readonly teamRepository: TeamRepository) {}

  async execute({ filter }: FilterQuery<JoinedTeam>) {
    return this.teamRepository.findAll(filter);
  }
}

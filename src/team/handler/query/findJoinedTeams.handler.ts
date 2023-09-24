import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { JoinedTeam } from '../../schema/joinedTeam.schema';
import { FindJoinedTeamsQuery } from '../../query/findJoinedTeams.query';

@QueryHandler(FindJoinedTeamsQuery)
export class FindJoinedTeamsHandler
  implements IQueryHandler<FindJoinedTeamsQuery>
{
  constructor(
    @InjectModel(JoinedTeam.name)
    private readonly teamModel: Model<JoinedTeam>,
  ) {}

  async execute({ filter }: FilterQuery<JoinedTeam>) {
    return this.teamModel.find(filter);
  }
}

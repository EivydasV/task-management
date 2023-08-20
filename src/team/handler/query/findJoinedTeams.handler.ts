import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { JoinedTeams } from '../../schema/joinedTeams.schema';
import { FindJoinedTeamsQuery } from '../../query/findJoinedTeams.query';

@QueryHandler(FindJoinedTeamsQuery)
export class FindJoinedTeamsHandler
  implements IQueryHandler<FindJoinedTeamsQuery>
{
  constructor(
    @InjectModel(JoinedTeams.name)
    private readonly teamModel: Model<JoinedTeams>,
  ) {}

  async execute({ filter }: FilterQuery<JoinedTeams>) {
    return this.teamModel.find(filter);
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { FindTeamsQuery } from '../../query/findTeams.query';
import { Team } from '../../schema/team.schema';

@QueryHandler(FindTeamsQuery)
export class FindTeamsHandler implements IQueryHandler<FindTeamsQuery> {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<Team>,
  ) {}

  async execute({ filter }: FilterQuery<Team>) {
    return this.teamModel.find(filter);
  }
}

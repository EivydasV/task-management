import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Team } from '../../schema/team.schema';
import { FindTeamQuery } from '../../query/findTeam.query';

@QueryHandler(FindTeamQuery)
export class FindTeamHandler implements IQueryHandler<FindTeamQuery> {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<Team>,
  ) {}

  async execute({ filter }: FilterQuery<Team>) {
    return this.teamModel.findOne(filter);
  }
}

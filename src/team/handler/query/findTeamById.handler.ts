import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team } from '../../schema/team.schema';
import { FindTeamByIdQuery } from '../../query/findTeamById.query';

@QueryHandler(FindTeamByIdQuery)
export class FindTeamByIdHandler implements IQueryHandler<FindTeamByIdQuery> {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<Team>,
  ) {}

  async execute({ id }: FindTeamByIdQuery) {
    return this.teamModel.findById(id);
  }
}

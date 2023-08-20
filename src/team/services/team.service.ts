import { Injectable } from '@nestjs/common';
import { CreateTeamInput } from '../input/createTeam.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTeamCommand } from '../command/createTeam.command';
import { Team, TeamDocument } from '../schema/team.schema';
import { FindTeamsQuery } from '../query/findTeams.query';
import { FilterQuery } from 'mongoose';
import { FindTeamQuery } from '../query/findTeam.query';
import { FindTeamByIdQuery } from '../query/findTeamById.query';

@Injectable()
export class TeamService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  async create(createTeamInput: CreateTeamInput) {
    return this.commandBus.execute<CreateTeamCommand, TeamDocument>(
      new CreateTeamCommand(createTeamInput),
    );
  }

  async findTeams(filter: FilterQuery<Team>) {
    return this.queryBus.execute<FindTeamsQuery, TeamDocument[]>(
      new FindTeamsQuery(filter),
    );
  }

  async findTeam(filter: FilterQuery<Team>) {
    return this.queryBus.execute<FindTeamQuery, TeamDocument>(
      new FindTeamQuery(filter),
    );
  }

  async findTeamById(id: string) {
    return this.queryBus.execute<FindTeamByIdQuery, TeamDocument>(
      new FindTeamByIdQuery(id),
    );
  }
}

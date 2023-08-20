import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FilterQuery } from 'mongoose';
import { JoinedTeams, JoinedTeamsDocument } from '../schema/joinedTeams.schema';
import { FindJoinedTeamsQuery } from '../query/findJoinedTeams.query';
import { JoinTeamInput } from '../input/joinTeam.input';
import { JoinTeamCommand } from '../command/joinTeam.command';

@Injectable()
export class JoinedTeamService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  async findJoinedTeams(filter: FilterQuery<JoinedTeams>) {
    return this.queryBus.execute<FindJoinedTeamsQuery, JoinedTeamsDocument[]>(
      new FindJoinedTeamsQuery(filter),
    );
  }

  async joinTeam(joinTeamInput: JoinTeamInput) {
    return this.commandBus.execute<JoinTeamCommand, JoinedTeamsDocument>(
      new JoinTeamCommand(joinTeamInput),
    );
  }
}

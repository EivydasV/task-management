import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FilterQuery } from 'mongoose';
import { JoinedTeam, JoinedTeamDocument } from '../schema/joinedTeam.schema';
import { FindJoinedTeamsQuery } from '../query/findJoinedTeams.query';
import { JoinTeamInput } from '../input/joinTeam.input';
import { JoinTeamCommand } from '../command/joinTeam.command';

@Injectable()
export class JoinedTeamService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  async findJoinedTeams(filter: FilterQuery<JoinedTeam>) {
    return this.queryBus.execute<FindJoinedTeamsQuery, JoinedTeamDocument[]>(
      new FindJoinedTeamsQuery(filter),
    );
  }

  async joinTeam(joinTeamInput: JoinTeamInput) {
    return this.commandBus.execute<JoinTeamCommand, JoinedTeamDocument>(
      new JoinTeamCommand(joinTeamInput),
    );
  }
}

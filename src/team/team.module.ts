import { Module } from '@nestjs/common';
import { TeamService } from './services/team.service';
import { TeamResolver } from './team.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from './schema/team.schema';
import { JoinedTeam, JoinedTeamSchema } from './schema/joinedTeam.schema';
import { CreateTeamHandler } from './handler/command/createTeam.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { FindTeamsHandler } from './handler/query/findTeams.handler';
import { FindJoinedTeamsHandler } from './handler/query/findJoinedTeams.handler';
import { JoinedTeamResolver } from './joinedTeam.resolver';
import { JoinedTeamService } from './services/joinedTeam.service';
import { JoinTeamHandler } from './handler/command/joinTeam.handler';
import { FindTeamHandler } from './handler/query/findTeam.handler';
import { FindTeamByIdHandler } from './handler/query/findTeamById.handler';
import { TeamRepository } from './repository/team.repository';
import { JoinedTeamRepository } from './repository/JoinedTeam.repository';

export const commandHandlers = [CreateTeamHandler, JoinTeamHandler];

export const queryHandlers = [
  FindTeamsHandler,
  FindTeamByIdHandler,
  FindTeamHandler,
  FindJoinedTeamsHandler,
];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: Team.name, schema: TeamSchema },
      {
        name: JoinedTeam.name,
        schema: JoinedTeamSchema,
      },
    ]),
  ],
  providers: [
    TeamResolver,
    TeamService,
    JoinedTeamResolver,
    JoinedTeamService,
    TeamRepository,
    JoinedTeamRepository,
    ...commandHandlers,
    ...queryHandlers,
  ],
})
export class TeamModule {}

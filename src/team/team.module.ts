import { Module } from '@nestjs/common';
import { TeamService } from './services/team.service';
import { TeamResolver } from './team.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from './schema/team.schema';
import { JoinedTeams, JoinedTeamsSchema } from './schema/joinedTeams.schema';
import { CreateTeamHandler } from './handler/command/createTeam.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { FindTeamsHandler } from './handler/query/findTeams.handler';
import { FindJoinedTeamsHandler } from './handler/query/findJoinedTeams.handler';
import { JoinedTeamResolver } from './joinedTeam.resolver';
import { JoinedTeamService } from './services/joinedTeam.service';
import { JoinTeamHandler } from './handler/command/joinTeam.handler';
import { FindTeamHandler } from './handler/query/findTeam.handler';
import { FindTeamByIdHandler } from './handler/query/findTeamById.handler';

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
        name: JoinedTeams.name,
        schema: JoinedTeamsSchema,
      },
    ]),
  ],
  providers: [
    TeamResolver,
    TeamService,
    JoinedTeamResolver,
    JoinedTeamService,
    ...commandHandlers,
    ...queryHandlers,
  ],
})
export class TeamModule {}

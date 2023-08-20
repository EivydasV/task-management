import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JoinTeamCommand } from '../../command/joinTeam.command';
import { JoinedTeams } from '../../schema/joinedTeams.schema';

@CommandHandler(JoinTeamCommand)
export class JoinTeamHandler implements ICommandHandler<JoinTeamCommand> {
  constructor(
    @InjectModel(JoinedTeams.name)
    private readonly joinedTeamsModel: Model<JoinedTeams>,
  ) {}

  async execute({ joinTeamInput: { team, member } }: JoinTeamCommand) {
    return this.joinedTeamsModel.create({ team, member });
  }
}

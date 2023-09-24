import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JoinTeamCommand } from '../../command/joinTeam.command';
import { JoinedTeamRepository } from '../../repository/JoinedTeam.repository';

@CommandHandler(JoinTeamCommand)
export class JoinTeamHandler implements ICommandHandler<JoinTeamCommand> {
  constructor(private readonly joinedTeamRepository: JoinedTeamRepository) {}

  async execute({ joinTeamInput: { team, member } }: JoinTeamCommand) {
    return this.joinedTeamRepository.create({ team, member });
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTeamCommand } from '../../command/createTeam.command';
import { Team } from '../../schema/team.schema';
import { TeamRepository } from '../../repository/team.repository';

@CommandHandler(CreateTeamCommand)
export class CreateTeamHandler implements ICommandHandler<CreateTeamCommand> {
  constructor(private readonly teamRepository: TeamRepository) {}

  async execute({ createTeamInput }: CreateTeamCommand) {
    return this.teamRepository.create(createTeamInput);
  }
}

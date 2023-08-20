import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTeamCommand } from '../../command/createTeam.command';
import { Team } from '../../schema/team.schema';

@CommandHandler(CreateTeamCommand)
export class CreateTeamHandler implements ICommandHandler<CreateTeamCommand> {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<Team>,
  ) {}

  async execute({ createTeamInput }: CreateTeamCommand) {
    return this.teamModel.create(createTeamInput);
  }
}

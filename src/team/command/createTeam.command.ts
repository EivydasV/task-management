import { CreateTeamInput } from '../input/createTeam.input';

export class CreateTeamCommand {
  constructor(public readonly createTeamInput: CreateTeamInput) {}
}

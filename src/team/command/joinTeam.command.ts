import { JoinTeamInput } from '../input/joinTeam.input';

export class JoinTeamCommand {
  constructor(public readonly joinTeamInput: JoinTeamInput) {}
}

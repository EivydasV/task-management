import { FilterQuery } from 'mongoose';
import { JoinedTeams } from '../schema/joinedTeams.schema';

export class FindJoinedTeamsQuery {
  constructor(public readonly filter: FilterQuery<JoinedTeams>) {}
}

import { FilterQuery } from 'mongoose';
import { JoinedTeam } from '../schema/joinedTeam.schema';

export class FindJoinedTeamsQuery {
  constructor(public readonly filter: FilterQuery<JoinedTeam>) {}
}

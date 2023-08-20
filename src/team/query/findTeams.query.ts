import { FilterQuery } from 'mongoose';
import { Team } from '../schema/team.schema';

export class FindTeamsQuery {
  constructor(public readonly filter: FilterQuery<Team>) {}
}

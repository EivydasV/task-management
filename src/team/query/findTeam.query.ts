import { FilterQuery } from 'mongoose';
import { Team } from '../schema/team.schema';

export class FindTeamQuery {
  constructor(public readonly filter: FilterQuery<Team>) {}
}

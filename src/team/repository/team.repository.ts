import { Injectable } from '@nestjs/common';
import { MongoRepository } from '../../common/repository/mongo.repository';
import { Team, TeamDocument } from '../schema/team.schema';

@Injectable()
export class TeamRepository extends MongoRepository<TeamDocument, Team>(Team) {}

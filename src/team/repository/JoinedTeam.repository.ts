import { Injectable } from '@nestjs/common';
import { MongoRepository } from '../../common/repository/mongo.repository';
import { JoinedTeamDocument, JoinedTeam } from '../schema/joinedTeam.schema';

@Injectable()
export class JoinedTeamRepository extends MongoRepository<
  JoinedTeamDocument,
  JoinedTeam
>(JoinedTeam) {}

import { User, UserDocument } from '../schema/user.schema';

import { Injectable } from '@nestjs/common';
import { MongoRepository } from '../../common/repository/mongo.repository';
@Injectable()
export class UserRepository extends MongoRepository<UserDocument, User>(User) {}

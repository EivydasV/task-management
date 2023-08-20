import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from '../../query/getUserByEmail.query';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user.schema';
import { Model } from 'mongoose';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async execute({ email }: GetUserByEmailQuery) {
    return this.userModel.findOne({ email: email }).lean();
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user.schema';
import { Model } from 'mongoose';
import { GetUserByIdQuery } from '../../query/getUserById.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async execute({ id }: GetUserByIdQuery) {
    return this.userModel.findById(id);
  }
}

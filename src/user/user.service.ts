import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateNewUserCommand } from '../user/command/createNewUser.command';
import { CreateUserInput } from '../user/input/create-user.input';
import { GetUserByIdQuery } from './query/getUserById.query';
import { UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createNewUser({
    password,
    email,
    lastName,
    firstName,
  }: CreateUserInput) {
    return await this.commandBus.execute(
      new CreateNewUserCommand(firstName, lastName, email, password),
    );
  }

  async getUserById(id: string) {
    return this.queryBus.execute<GetUserByIdQuery, UserDocument | null>(
      new GetUserByIdQuery(id),
    );
  }
}

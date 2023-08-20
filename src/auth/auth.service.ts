import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from '../user/query/getUserByEmail.query';
import { User } from '../user/schema/user.schema';
import { LoginUserCommand } from './command/loginUser.command';
import { GraphQLContext } from '../utils/types/graphql/context';
import { LoginUserInput } from './input/login-user.input';
import { CreateUserInput } from '../user/input/create-user.input';
import { CreateNewUserCommand } from '../user/command/createNewUser.command';

@Injectable()
export class AuthService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
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

  async login(ctx: GraphQLContext, { password, email }: LoginUserInput) {
    const user = await this.queryBus.execute<GetUserByEmailQuery, User | null>(
      new GetUserByEmailQuery(email),
    );
    if (!user) {
      throw new BadRequestException('wrong email or password');
    }

    await this.commandBus.execute<LoginUserCommand, void>(
      new LoginUserCommand(ctx, user, password),
    );
  }
}

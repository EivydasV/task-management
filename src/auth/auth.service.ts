import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindUserByQuery } from '../user/query/findUserBy.query';
import { User, UserDocument } from '../user/schema/user.schema';
import { LoginUserCommand } from './command/loginUser.command';
import { LoginUserInput } from './input/login-user.input';
import { CreateUserInput } from '../user/input/create-user.input';
import { CreateNewUserCommand } from '../user/command/createNewUser.command';
import { GraphQLContext } from '../utils/types/graphql/context';
import { createNewSession } from 'supertokens-node/recipe/session';

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
    const user = await this.commandBus.execute<LoginUserCommand, UserDocument>(
      new LoginUserCommand(email, password),
    );

    await createNewSession(ctx.req, ctx.res, 'public', user._id);
  }
}

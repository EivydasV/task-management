import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserDocument } from '../user/schema/user.schema';
import { LoginUserCommand } from './command/loginUser.command';
import { LoginUserInput } from './input/login-user.input';
import { CreateUserInput } from '../user/input/create-user.input';
import { CreateNewUserCommand } from '../user/command/createNewUser.command';
import { GraphQLContext } from '../utils/types/graphql/context';
import { createNewSession } from 'supertokens-node/recipe/session';
import supertokens from 'supertokens-node';

@Injectable()
export class AuthService {
  constructor(private readonly commandBus: CommandBus) {}

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

    await createNewSession(
      ctx.req,
      ctx.res,
      'public',
      supertokens.convertToRecipeUserId(user._id),
    );
  }
}

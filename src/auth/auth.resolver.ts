import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/common/decorators/public.decorator';
import { CurrentUser } from './decorator/currentUser.decorator';
import { LoginUserInput } from './input/login-user.input';
import { User } from '../user/schema/user.schema';
import { AuthService } from './auth.service';
import { CreateUserInput } from '../user/input/create-user.input';
import { GraphQLContext } from '../utils/types/graphql/context';
import Session from 'supertokens-node/recipe/session';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => Boolean)
  async register(
    @Args('registerInput') registerUserInput: CreateUserInput,
  ): Promise<boolean> {
    await this.authService.createNewUser(registerUserInput);

    return true;
  }

  @Public()
  @Mutation(() => Boolean)
  async login(
    @Context() ctx: GraphQLContext,
    @Args('loginInput') { password, email }: LoginUserInput,
  ): Promise<boolean> {
    await this.authService.login(ctx, { password, email });

    return true;
  }

  @Public()
  @Mutation(() => Boolean)
  async refreshSession(@Context() ctx: GraphQLContext): Promise<boolean> {
    const s = await Session.refreshSession(ctx.req, ctx.res);
    return true;
  }

  @Mutation(() => Boolean)
  async logout(@Context() ctx: GraphQLContext): Promise<boolean> {
    await ctx.session?.revokeSession();

    return true;
  }

  @Query(() => User)
  async me(@CurrentUser() currentUser: User): Promise<User> {
    return currentUser;
  }
}

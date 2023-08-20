import { GraphQLContext } from '../../utils/types/graphql/context';
import { User } from '../../user/schema/user.schema';

export class LoginUserCommand {
  constructor(
    public readonly ctx: GraphQLContext,
    public readonly user: User,
    public readonly password: string,
  ) {}
}

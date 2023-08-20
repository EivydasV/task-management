import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './schema/user.schema';
import { Public } from '../common/decorators/public.decorator';
import { CreateUserInput } from './input/create-user.input';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CursorPaginatedUser,
  OffsetPaginatedUser,
  User,
} from './schema/user.schema';
import { UserService } from './user.service';
import { CursorPaginationArgs } from '../utils/graphql/mongo/pagination/cursorPagination.args';
import {
  CursorPaginationPipe,
  CursorPaginationParam,
} from '../common/pipes/cursorPagination.pipe';
import { ForgotPasswordInput } from './input/forgotPassword.input';
import { Public } from '../common/decorators/public.decorator';
import { ResetPasswordInput } from './input/resetPassword.input';
import {
  OffsetPaginationParam,
  OffsetPaginationPipe,
} from '../common/pipes/offsetPagination.pipe';
import { OffsetPaginationArgs } from '../utils/graphql/mongo/pagination/offsetPagination.args';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => CursorPaginatedUser)
  async findUsersCursor(
    @Args({ type: () => CursorPaginationArgs }, CursorPaginationPipe)
    cursorPaginationArgs: CursorPaginationParam<User>,
  ) {
    return this.userService.findUsersCursor(cursorPaginationArgs);
  }

  @Query(() => OffsetPaginatedUser)
  async findUsersOffset(
    @Args({ type: () => OffsetPaginationArgs }, OffsetPaginationPipe)
    offsetPaginationArgs: OffsetPaginationParam<User>,
  ) {
    return this.userService.findUsersOffset(offsetPaginationArgs);
  }

  @Public()
  @Mutation(() => Boolean)
  async forgotPassword(
    @Args('forgotPasswordInput') forgotPasswordInput: ForgotPasswordInput,
  ): Promise<boolean> {
    await this.userService.forgotPassword(forgotPasswordInput);

    return true;
  }

  @Public()
  @Mutation(() => Boolean)
  async resetPassword(
    @Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput,
  ): Promise<boolean> {
    await this.userService.resetPassword(resetPasswordInput);

    return true;
  }
}

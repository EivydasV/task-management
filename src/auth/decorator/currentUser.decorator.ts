import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../../user/schema/user.schema';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context).getContext();
    const user = ctx.req?.user as User;
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  },
);

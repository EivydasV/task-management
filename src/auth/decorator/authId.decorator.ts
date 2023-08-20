import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../../user/schema/user.schema';

type AuthData = {
  isRequired?: boolean;
};
export const AuthId = createParamDecorator(
  (data: AuthData, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context).getContext();
    const user = ctx.req?.user as User;
    if (data?.isRequired && !user) {
      throw new UnauthorizedException();
    }

    return user?._id;
  },
);

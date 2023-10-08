import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Error as STError } from 'supertokens-node';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';

import { GraphQLContext } from '../../utils/types/graphql/context';
import { UserService } from '../../user/user.service';
import { User } from '../../user/schema/user.schema';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const ctx =
      GqlExecutionContext.create(context).getContext<GraphQLContext>();
    const req = ctx.req;
    const resp = ctx.res;
    const session = ctx?.session;

    if (isPublic) {
      const authId = session?.getUserId();
      let user: User | null = null;

      if (authId) {
        user = await this.userService.getUserById(authId);
      }

      req.user = user;

      return true;
    }

    if (resp?.headersSent) {
      throw new STError({
        message: 'RESPONSE_SENT',
        type: 'RESPONSE_SENT',
      });
    }

    if (!session) {
      throw new UnauthorizedException();
    }

    const authId = session.getUserId();

    const user = await this.userService.getUserById(authId);
    if (!user) {
      throw new UnauthorizedException();
    }

    req.user = user;

    return true;
  }
}

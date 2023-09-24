import { GraphQLExecutionContext } from '@nestjs/graphql';
import { SessionRequest } from 'supertokens-node/lib/build/framework/express';
import { Request, Response } from 'express';
import { User } from '../../../user/schema/user.schema';

export type GraphQLContext = GraphQLExecutionContext & {
  req: Request & { user: User | null };
  res: Response;
  session: SessionRequest['session'];
};

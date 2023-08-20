import { GraphQLExecutionContext } from '@nestjs/graphql';
import { SessionRequest } from 'supertokens-node/lib/build/framework/express';
import { User } from '../../../user/schema/user.schema';
import { Request, Response } from 'express';

export type GraphQLContext = GraphQLExecutionContext & {
  req: Request & { user: User | null };
  res: Response;
  session: SessionRequest['session'];
};

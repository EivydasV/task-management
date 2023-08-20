import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { join } from 'node:path';
import { GraphQLModule } from '@nestjs/graphql';
import { SessionRequest } from 'supertokens-node/lib/build/framework/express';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { ApolloDriver } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import authConfig from './auth/config/auth.config';
import { EntityExistsConstrains } from './common/validators/is-unique.validator';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { CqrsModule } from '@nestjs/cqrs';
import { TeamModule } from './team/team.module';
import * as mongooseAutoPopulate from 'mongoose-autopopulate';
@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27018/task-management', {
      connectionFactory: (connection) => {
        connection.plugin(mongooseAutoPopulate);
        return connection;
      },
    }),
    AuthModule.forRootAsync({
      inject: [authConfig.KEY],
      imports: [ConfigModule.forFeature(authConfig)],
      useFactory: (config: ConfigType<typeof authConfig>) => {
        return {
          connectionURI: config.CONNECTION_URI,
          appInfo: {
            appName: config.appInfo.APP_NAME,
            apiDomain: config.appInfo.API_DOMAIN,
            websiteDomain: config.appInfo.WEBSITE_DOMAIN,
            apiBasePath: config.appInfo.API_BASE_PATH,
            websiteBasePath: config.appInfo.WEBSITE_BASE_PATH,
          },
        };
      },
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      credentials: true,
      playground: {
        settings: {
          'request.credentials': 'include', // Otherwise cookies won't be sent
        },
      },
      context: ({ req, res }: { req: SessionRequest; res: Response }) => {
        return {
          session: req.session,
          req,
          res,
        };
      },
    }),
    TaskModule,
    UserModule,
    TeamModule,
  ],
  controllers: [],
  providers: [
    EntityExistsConstrains,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
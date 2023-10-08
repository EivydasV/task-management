import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { join } from 'node:path';
import { GraphQLModule } from '@nestjs/graphql';
import { SessionRequest } from 'supertokens-node/lib/build/framework/express';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { ApolloDriver } from '@nestjs/apollo';
import { EntityExistsConstrains } from './common/validators/is-unique.validator';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { CqrsModule } from '@nestjs/cqrs';
import { TeamModule } from './team/team.module';
import { AuthModule } from './auth/auth.module';
import authConfig from './auth/config/auth.config';
import { UserModule } from './user/user.module';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { AppLoggingMiddleware } from './common/middlewares/app-logging.middleware';
import { CommonModule } from './common/common.module';
import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://db:27017/task-management'),
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
    TeamModule,
    UserModule,
    CommonModule,
    CryptoModule,
  ],
  controllers: [],
  providers: [
    EntityExistsConstrains,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggingMiddleware).forRoutes('*');
  }
}

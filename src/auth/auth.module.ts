import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from './middleware/auth.middleware';
import { SupertokensService } from './supertokens/supertokens.service';
import { ConfigurableModuleClass } from './auth.module-definition';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { CqrsModule } from '@nestjs/cqrs';
import { LoginUserHandler } from './handler/command/loginUser.handler';

import { CreateNewUserHandler } from './handler/command/createNewUser.handler';
import { UserModule } from '../user/user.module';
import { HashingService } from './hashing/hashing.service';
import { ArgonService } from './hashing/argon.service';

export const commandHandlers = [LoginUserHandler, CreateNewUserHandler];

@Module({
  imports: [CqrsModule, UserModule],
  providers: [
    SupertokensService,
    AuthResolver,
    AuthService,
    ...commandHandlers,
    {
      provide: HashingService,
      useClass: ArgonService,
    },
  ],
  controllers: [],
  exports: [],
})
export class AuthModule extends ConfigurableModuleClass implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}

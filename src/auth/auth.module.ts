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
import { CryptoModule } from '../crypto/crypto.module';

export const commandHandlers = [LoginUserHandler, CreateNewUserHandler];

@Module({
  imports: [CqrsModule, UserModule, CryptoModule],
  providers: [
    SupertokensService,
    AuthResolver,
    AuthService,
    ...commandHandlers,
  ],
  controllers: [],
  exports: [],
})
export class AuthModule extends ConfigurableModuleClass implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}

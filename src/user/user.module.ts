import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { CqrsModule } from '@nestjs/cqrs';
import { FindUserByHandler } from './handler/query/findUserBy.handler';
import { FindUserByIdHandler } from './handler/query/findUserById.handler';
import { UserRepository } from './repository/user.repository';

export const commandHandlers = [];
export const queryHandlers = [FindUserByHandler, FindUserByIdHandler];
@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    UserResolver,
    UserService,
    UserRepository,
    ...commandHandlers,
    ...queryHandlers,
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}

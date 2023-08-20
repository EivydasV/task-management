import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUserByEmailHandler } from './handler/query/getUserByEmail.handler';
import { GetUserByIdHandler } from './handler/query/getUserById.handler';

export const commandHandlers = [];

export const queryHandlers = [GetUserByEmailHandler, GetUserByIdHandler];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserResolver, UserService, ...commandHandlers, ...queryHandlers],
  exports: [UserService],
})
export class UserModule {}

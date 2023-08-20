import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { createNewSession } from 'supertokens-node/recipe/session';
import { LoginUserCommand } from '../../command/loginUser.command';
import { HashingService } from '../../../user/hashing/hashing.service';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly hashingService: HashingService,
  ) {}

  async execute(command: LoginUserCommand) {
    const { user, ctx, password } = command;

    if (!(await this.hashingService.compare(user.password, password))) {
      throw new BadRequestException('wrong email or password');
    }

    await createNewSession(ctx.req, ctx.res, 'public', user._id);
  }
}

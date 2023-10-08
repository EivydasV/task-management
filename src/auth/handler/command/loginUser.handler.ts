import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { LoginUserCommand } from '../../command/loginUser.command';
import { FindUserByQuery } from '../../../user/query/findUserBy.query';
import { UserDocument } from '../../../user/schema/user.schema';
import { HashingService } from '../../../crypto/services/hashing.service';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly hashingService: HashingService,
  ) {}

  async execute(command: LoginUserCommand) {
    const { email, password } = command;

    const user = await this.queryBus.execute<FindUserByQuery, UserDocument>(
      new FindUserByQuery({ email }),
    );
    if (!user) {
      throw new BadRequestException('wrong email or password');
    }

    if (!(await this.hashingService.compare(user.password, password))) {
      throw new BadRequestException('wrong email or password');
    }

    return user;
  }
}

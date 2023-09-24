import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewUserCommand } from '../../../user/command/createNewUser.command';
import { UserRepository } from '../../../user/repository/user.repository';
import { HashingService } from '../../hashing/hashing.service';
@CommandHandler(CreateNewUserCommand)
export class CreateNewUserHandler
  implements ICommandHandler<CreateNewUserCommand>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
  ) {}

  async execute(command: CreateNewUserCommand) {
    const { lastName, firstName, password, email } = command;
    return this.userRepository.create({
      email,
      role: 'user',
      password: await this.hashingService.hash(password),
      firstName,
      lastName,
    });
  }
}

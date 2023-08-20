import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewUserCommand } from '../../../user/command/createNewUser.command';
import { Model } from 'mongoose';
import { User } from '../../../user/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'argon2';
import { HashingService } from '../../hashing/hashing.service';

@CommandHandler(CreateNewUserCommand)
export class CreateNewUserHandler
  implements ICommandHandler<CreateNewUserCommand>
{
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async execute(command: CreateNewUserCommand) {
    const { lastName, firstName, password, email } = command;
    const user = new this.userModel({
      lastName,
      firstName,
      password: await hash(password),
      email,
      role: 'user',
    });

    return await user.save();
  }
}

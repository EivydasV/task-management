import { BadRequestException, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindUserByIdQuery } from './query/findUserById.query';
import {
  CursorPaginatedUser,
  OffsetPaginatedUser,
  User,
  UserDocument,
} from './schema/user.schema';
import { FindUsersCursorQuery } from './query/findUsersCursor.query';
import { CursorPaginationParam } from '../common/pipes/cursorPagination.pipe';
import { ForgotPasswordInput } from './input/forgotPassword.input';
import { FindUserByQuery } from './query/findUserBy.query';
import { HashingService } from '../crypto/services/hashing.service';
import { BaseEncryption } from 'src/crypto/encryption/base.encryption';
import { ResetPasswordInput } from './input/resetPassword.input';
import { OffsetPaginationParam } from '../common/pipes/offsetPagination.pipe';
import { FindUsersOffsetQuery } from './query/findUsersOffset.query';

@Injectable()
export class UserService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly hashingService: HashingService,
    private readonly baseEncryption: BaseEncryption,
  ) {}

  async getUserById(id: string) {
    return this.queryBus.execute<FindUserByIdQuery, UserDocument | null>(
      new FindUserByIdQuery(id),
    );
  }

  findUsersCursor(cursorPaginationArgs: CursorPaginationParam<User>) {
    return this.queryBus.execute<FindUsersCursorQuery, CursorPaginatedUser>(
      new FindUsersCursorQuery(cursorPaginationArgs),
    );
  }

  findUsersOffset(offsetPaginationArgs: OffsetPaginationParam<User>) {
    return this.queryBus.execute<FindUsersOffsetQuery, OffsetPaginatedUser>(
      new FindUsersOffsetQuery(offsetPaginationArgs),
    );
  }

  async forgotPassword(forgotPasswordInput: ForgotPasswordInput) {
    const user = await this.queryBus.execute<FindUserByQuery, UserDocument>(
      new FindUserByQuery({ email: forgotPasswordInput.email }),
    );
    if (!user) {
      return true;
    }

    const token = this.baseEncryption.createRandomToken();

    user.passwordResetToken = await this.hashingService.hash(token);
    user.passwordResetTokenExpiresAt = new Date(
      // 2 hours
      Date.now() + 2 * 60 * 60 * 1000,
    );

    const savedUser = await user.save();

    console.log(savedUser);
    console.log(token);

    //implement send email

    return true;
  }

  async resetPassword(resetPasswordInput: ResetPasswordInput) {
    const error = new BadRequestException(
      'Password reset token is invalid or has expired.',
    );
    const user = await this.queryBus.execute<FindUserByIdQuery, UserDocument>(
      new FindUserByIdQuery(resetPasswordInput.userId),
    );

    if (!user || !user.passwordResetToken) {
      throw error;
    }

    const isTokenValid = await this.hashingService.compare(
      user.passwordResetToken,
      resetPasswordInput.token,
    );

    if (!isTokenValid) {
      throw error;
    }

    if (
      !user.passwordResetTokenExpiresAt ||
      user.passwordResetTokenExpiresAt < new Date()
    ) {
      user.passwordResetTokenExpiresAt = undefined;
      user.passwordResetToken = undefined;
      await user.save();

      throw error;
    }

    user.password = await this.hashingService.hash(resetPasswordInput.password);
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiresAt = undefined;

    return await user.save();
  }
}

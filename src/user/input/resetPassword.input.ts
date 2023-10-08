import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { InputType, PickType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class ResetPasswordInput extends PickType(CreateUserInput, [
  'password',
  'password_confirmation',
]) {
  @IsNotEmpty()
  @IsString()
  token!: string;

  @IsNotEmpty()
  @IsMongoId()
  userId!: string;
}

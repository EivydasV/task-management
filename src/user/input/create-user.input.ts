import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { IsEqualTo } from 'src/common/validators/is-equal-to.valdiator';
import { IsStrongPassword } from 'src/common/validators/strong-password.valdiator';
import { Transform, TransformFnParams } from 'class-transformer';
import { EntityExists } from '../../common/validators/is-unique.validator';
import { InputType } from '@nestjs/graphql';
import { User } from '../schema/user.schema';

@InputType()
export class CreateUserInput {
  @Length(2, 50)
  @IsAlpha()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Transform(({ value }: TransformFnParams) => value?.replace(/\s\s+/g, ' '))
  firstName!: string;

  @Length(2, 50)
  @IsAlpha()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Transform(({ value }: TransformFnParams) => value?.replace(/\s\s+/g, ' '))
  lastName!: string;

  @EntityExists(User.name)
  @Length(2, 50)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Transform(({ value }: TransformFnParams) => value?.replace(/\s\s+/g, ' '))
  email!: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  password!: string;

  @IsNotEmpty()
  @IsString()
  @IsEqualTo('password')
  @Transform(({ value }: TransformFnParams) => value?.trim())
  password_confirmation!: string;
}

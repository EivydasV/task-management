import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ForgotPasswordInput {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Transform(({ value }: TransformFnParams) => value?.replace(/\s\s+/g, ' '))
  email!: string;
}

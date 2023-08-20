import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  email!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password!: string;
}

import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Connection, Types } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@ValidatorConstraint({ async: true })
@Injectable()
export class EntityExistsConstrains implements ValidatorConstraintInterface {
  constructor(@InjectConnection() private connection: Connection) {}

  async validate(text: string, validationArguments: ValidationArguments) {
    const { property } = validationArguments;
    const [model, field, mustExist] = validationArguments.constraints as [
      string,
      string,
      boolean,
    ];
    if (!text) {
      return false;
    }

    if (field === '_id' && !Types.ObjectId.isValid(text)) {
      return false;
    }

    const entity = await this.connection
      .model(model)
      .findOne({ [field ?? property]: text });

    if (mustExist) {
      return !!entity;
    }

    return !entity;
  }

  defaultMessage(args: ValidationArguments) {
    const [, , mustExist] = args.constraints as [string, string, boolean];
    if (mustExist) {
      return `${args.property} does not exist`;
    }

    return `${args.property} already exist`;
  }
}

export function EntityExists<T extends string>(
  model: T,
  field?: string,
  mustExist?: boolean,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model, field, mustExist],
      validator: EntityExistsConstrains,
    });
  };
}

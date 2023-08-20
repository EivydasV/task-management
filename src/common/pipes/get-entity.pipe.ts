import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { IdentifiableEntitySchema } from '../../utils/db/IdentifiableEntity.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

export function GetEntityPipe(
  entity: Type<IdentifiableEntitySchema>,
): Type<PipeTransform> {
  @Injectable()
  class getEntityPipe implements PipeTransform {
    constructor(
      @InjectModel(entity.name)
      private readonly entityModel: Model<any>,
    ) {}

    async transform(value: any, { data }: ArgumentMetadata) {
      const ex = new NotFoundException(`${entity.name} not found`);

      if ((data === 'id' || data === '_id') && !Types.ObjectId.isValid(value)) {
        throw ex;
      }

      const record = await this.entityModel.findById(value).lean();
      if (!record) {
        throw ex;
      }

      return record;
    }
  }

  return getEntityPipe;
}

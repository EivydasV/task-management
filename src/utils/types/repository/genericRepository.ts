import { Document, FilterQuery, UpdateQuery } from 'mongoose';
import { MongooseQuery } from '../mongoose/query';
import { ICursorPaginatedType } from '../../graphql/mongo/pagination/cursorPagination.args';
import { CursorPaginationParam } from '../../../common/pipes/cursorPagination.pipe';
import { IdentifiableEntitySchema } from '../../db/IdentifiableEntity.schema';
import { OffsetPaginationParam } from '../../../common/pipes/offsetPagination.pipe';
import { IOffsetPaginatedType } from '../../graphql/mongo/pagination/offsetPagination.args';

export interface GenericRepository<
  T extends Document,
  K extends IdentifiableEntitySchema,
> {
  create(entity: K): Promise<MongooseQuery<T>>;
  findByIdAndUpdate(id: string, update: UpdateQuery<T>): MongooseQuery<T>;
  findByIdAndDelete(id: string): MongooseQuery<T>;
  findOneAndRemove(filter: FilterQuery<T>): MongooseQuery<T>;
  findById(id: string): MongooseQuery<T>;
  findAll(filter?: FilterQuery<T>): MongooseQuery<T[]>;
  cursorPaginate(
    filter: CursorPaginationParam<T>,
  ): Promise<ICursorPaginatedType<T>>;
  offsetPaginate(
    filter: OffsetPaginationParam<T>,
  ): Promise<IOffsetPaginatedType<T>>;
  findOne(filter: FilterQuery<T>): MongooseQuery<T>;
  estimateDocumentCount(): MongooseQuery<number>;
}

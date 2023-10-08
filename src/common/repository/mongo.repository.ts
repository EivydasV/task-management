import {
  Document,
  FilterQuery,
  HydratedDocument,
  Model,
  UpdateQuery,
} from 'mongoose';
import { GenericRepository } from '../../utils/types/repository/genericRepository';
import { Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongooseQuery } from '../../utils/types/mongoose/query';
import { ICursorPaginatedType } from '../../utils/graphql/mongo/pagination/cursorPagination.args';
import { PaginationService } from '../services/pagination.service';
import { IdentifiableEntitySchema } from '../../utils/db/IdentifiableEntity.schema';
import { CursorPaginationParam } from '../pipes/cursorPagination.pipe';
import { OffsetPaginationParam } from '../pipes/offsetPagination.pipe';
import { IOffsetPaginatedType } from '../../utils/graphql/mongo/pagination/offsetPagination.args';

export function MongoRepository<
  T extends Document,
  K extends IdentifiableEntitySchema,
>(entityCLs: Type<K>): Type<GenericRepository<T, K>> {
  @Injectable()
  class MongoRepositoryCls implements GenericRepository<T, K> {
    public constructor(
      @InjectModel(entityCLs.name) public entity: Model<any>,
      private readonly paginationService: PaginationService,
    ) {}

    estimateDocumentCount(): MongooseQuery<number> {
      return this.entity.estimatedDocumentCount();
    }

    findOne(filter: FilterQuery<T>): MongooseQuery<T> {
      return this.entity.findOne(filter);
    }

    findOneAndRemove(filter: FilterQuery<T>): MongooseQuery<T> {
      return this.entity.findOneAndRemove(filter);
    }

    findAll(filter: FilterQuery<T>): MongooseQuery<T[]> {
      return this.entity.find(filter);
    }

    findById(id: string): MongooseQuery<T> {
      return this.entity.findById(id);
    }

    findByIdAndUpdate(id: string, update: UpdateQuery<T>): MongooseQuery<T> {
      return this.entity.findByIdAndUpdate(id, update);
    }

    findByIdAndDelete(id: string): MongooseQuery<T> {
      return this.entity.findByIdAndDelete(id);
    }

    create(entity: K): Promise<MongooseQuery<T>> {
      return this.entity.create(entity);
    }

    async cursorPaginate({
      filters,
      pageInfo,
    }: CursorPaginationParam<T>): Promise<ICursorPaginatedType<T>> {
      const [docs, totalDocs]: [HydratedDocument<T>[], number] =
        await Promise.all([
          this.entity.find(filters).limit(pageInfo.take + 1),
          this.estimateDocumentCount(),
        ]);

      return this.paginationService.cursorPaginate<T>(
        docs,
        totalDocs,
        pageInfo,
      );
    }

    async offsetPaginate({
      pageInfo,
      filters,
    }: OffsetPaginationParam<T>): Promise<IOffsetPaginatedType<T>> {
      const skip = pageInfo.take * (pageInfo.page - 1);
      const [docs, totalDocs]: [HydratedDocument<T>[], number] =
        await Promise.all([
          this.entity.find(filters).skip(skip).limit(pageInfo.take),
          this.estimateDocumentCount(),
        ]);

      return this.paginationService.offsetPaginate(docs, totalDocs, pageInfo);
    }
  }

  return MongoRepositoryCls;
}

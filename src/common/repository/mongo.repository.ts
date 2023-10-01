import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { GenericRepository } from '../../utils/types/repository/genericRepository';
import { Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongooseQuery } from '../../utils/types/mongoose/query';

export function MongoRepository<T extends Document, K>(
  entityCLs: Type<K>,
): Type<GenericRepository<T, K>> {
  @Injectable()
  class MongoRepositoryCls implements GenericRepository<T, K> {
    public constructor(
      @InjectModel(entityCLs.name) public entity: Model<any>,
    ) {}

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
  }

  return MongoRepositoryCls;
}

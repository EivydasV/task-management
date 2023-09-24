import { FilterQuery, UpdateQuery } from 'mongoose';
import { MongooseQuery } from '../mongoose/query';

export interface GenericRepository<T, K> {
  create(entity: K): Promise<MongooseQuery<T>>;
  findByIdAndUpdate(id: string, update: UpdateQuery<T>): MongooseQuery<T>;
  findByIdAndDelete(id: string): MongooseQuery<T>;
  findOneAndRemove(filter: FilterQuery<T>): MongooseQuery<T>;
  findById(id: string): MongooseQuery<T>;
  findAll(filter?: FilterQuery<T>): MongooseQuery<T[]>;
  findOne(filter: FilterQuery<T>): MongooseQuery<T>;
}

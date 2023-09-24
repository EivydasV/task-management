import { Query } from 'mongoose';

export type MongooseQuery<T> = Query<T, any, NonNullable<unknown>, any, any> &
  NonNullable<unknown>;

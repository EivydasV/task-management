import { Injectable, PipeTransform } from '@nestjs/common';
import mongoose, { FilterQuery } from 'mongoose';
import { CursorPaginationArgs } from '../../utils/graphql/mongo/pagination/cursorPagination.args';
import { IdentifiableEntitySchema } from '../../utils/db/IdentifiableEntity.schema';

export type CursorPaginationParam<T extends IdentifiableEntitySchema> = {
  pageInfo: CursorPaginationArgs;
  filters: FilterQuery<T>;
};

@Injectable()
export class CursorPaginationPipe<T extends IdentifiableEntitySchema>
  implements PipeTransform<CursorPaginationArgs, CursorPaginationParam<T>>
{
  private readonly maxAllowedPerPage = 100;
  private readonly defaultPerPage = 20;

  transform(value: CursorPaginationArgs): CursorPaginationParam<T> {
    let cursor = value.cursor;
    value.take = Math.abs(value.take);
    value.take = value.take === 0 ? this.defaultPerPage : value.take;
    const take =
      this.maxAllowedPerPage < value.take ? this.defaultPerPage : value.take;
    const filters: FilterQuery<T> = {};

    if (cursor && mongoose.Types.ObjectId.isValid(cursor)) {
      filters._id = { $gt: cursor };
    } else {
      cursor = null;
    }

    return { pageInfo: { cursor, take }, filters };
  }
}

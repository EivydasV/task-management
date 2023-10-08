import { Injectable, PipeTransform } from '@nestjs/common';
import mongoose, { FilterQuery } from 'mongoose';
import { CursorPaginationArgs } from '../../utils/graphql/mongo/pagination/cursorPagination.args';
import { IdentifiableEntitySchema } from '../../utils/db/IdentifiableEntity.schema';
import { OffsetPaginationArgs } from '../../utils/graphql/mongo/pagination/offsetPagination.args';

export type OffsetPaginationParam<T extends IdentifiableEntitySchema> = {
  pageInfo: OffsetPaginationArgs;
  filters: FilterQuery<T>;
};

@Injectable()
export class OffsetPaginationPipe<T extends IdentifiableEntitySchema>
  implements PipeTransform<OffsetPaginationArgs, OffsetPaginationParam<T>>
{
  private readonly maxAllowedPerPage = 100;
  private readonly defaultPerPage = 20;

  transform(value: OffsetPaginationArgs): OffsetPaginationParam<T> {
    value.take = Math.abs(value.take);
    value.take = value.take === 0 ? this.defaultPerPage : value.take;
    const take =
      this.maxAllowedPerPage < value.take ? this.defaultPerPage : value.take;
    const filters: FilterQuery<T> = {};

    let page = Math.abs(value.page);
    page = page === 0 ? 1 : page;

    return { pageInfo: { page, take }, filters };
  }
}

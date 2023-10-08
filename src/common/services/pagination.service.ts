import { Injectable } from '@nestjs/common';
import {
  CursorPaginationArgs,
  ICursorPaginatedType,
} from '../../utils/graphql/mongo/pagination/cursorPagination.args';
import { HydratedDocument } from 'mongoose';
import { IdentifiableEntitySchema } from '../../utils/db/IdentifiableEntity.schema';
import {
  IOffsetPaginatedType,
  OffsetPaginationArgs,
} from '../../utils/graphql/mongo/pagination/offsetPagination.args';

@Injectable()
export class PaginationService {
  cursorPaginate<T extends IdentifiableEntitySchema>(
    docs: HydratedDocument<T>[],
    totalDocs: number,
    pageInfo: CursorPaginationArgs,
  ): ICursorPaginatedType<T> {
    let nextCursor: string | null = null;

    if (docs.length > pageInfo.take) {
      docs.pop();
      nextCursor = docs.at(-1)!._id;
    }

    const totalPages = Math.ceil(totalDocs / pageInfo.take);

    return {
      edges: docs.map((doc, index) => ({
        node: doc,
        cursor: doc._id,
      })),
      totalDocs,
      nextCursor,
      totalPages,
      pageInfo,
    };
  }

  offsetPaginate<T extends IdentifiableEntitySchema>(
    docs: HydratedDocument<T>[],
    totalDocs: number,
    pageInfo: OffsetPaginationArgs,
  ): IOffsetPaginatedType<T> {
    const totalPages = Math.ceil(totalDocs / pageInfo.take);

    return {
      edges: docs.map((doc, index) => ({
        node: doc,
        cursor: index,
      })),
      totalDocs,
      totalPages,
      currentPage: pageInfo.page,
      hasNextPage: pageInfo.page < totalPages,
      hasPreviousPage: pageInfo.page > 1,
      nextPage: pageInfo.page + 1 > totalPages ? null : pageInfo.page + 1,
      previousPage: pageInfo.page - 1 < 1 ? null : pageInfo.page - 1,
      pageInfo,
    };
  }
}

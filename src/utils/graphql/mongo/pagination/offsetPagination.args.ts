import { Field, ObjectType, Int, ArgsType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { CursorPaginationArgs } from './cursorPagination.args';

interface IOffsetEdgeType<T> {
  node: T;
}

export interface IOffsetPaginatedType<T> {
  edges: IOffsetEdgeType<T>[];

  totalDocs: number;

  hasNextPage: boolean;

  hasPreviousPage: boolean;

  nextPage: number | null;

  previousPage: number | null;

  currentPage: number;

  totalPages: number;

  pageInfo: OffsetPaginationArgs;
}

export function OffsetPaginated<T>(
  classRef: Type<T>,
): Type<IOffsetPaginatedType<T>> {
  @ObjectType(`offset${classRef.name}Edge`)
  abstract class OffsetEdgeType {
    @Field(() => classRef)
    node!: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class OffsetPaginatedType implements IOffsetPaginatedType<T> {
    @Field(() => [OffsetEdgeType], { nullable: true })
    edges!: OffsetEdgeType[];

    @Field(() => Int)
    totalDocs!: number;

    @Field(() => Int)
    currentPage!: number;

    hasNextPage!: boolean;

    hasPreviousPage!: boolean;

    @Field(() => Int, { nullable: true })
    nextPage!: number | null;

    @Field(() => Int, { nullable: true })
    previousPage!: number | null;

    @Field(() => Int)
    totalPages!: number;

    @Field(() => OffsetPaginationArgs)
    pageInfo!: OffsetPaginationArgs;
  }

  return OffsetPaginatedType as Type<IOffsetPaginatedType<T>>;
}

@ObjectType()
@ArgsType()
export class OffsetPaginationArgs {
  @Field({ defaultValue: 1 })
  page!: number;

  @Field(() => Int, { defaultValue: 20 })
  take: number = 20;
}

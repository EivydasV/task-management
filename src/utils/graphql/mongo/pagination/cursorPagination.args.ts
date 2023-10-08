import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

interface ICursorEdgeType<T> {
  cursor: string;
  node: T;
}

export interface ICursorPaginatedType<T> {
  edges: ICursorEdgeType<T>[];
  totalDocs: number;
  nextCursor: string | null;
  totalPages: number;
  pageInfo: CursorPaginationArgs;
}

export function CursorPaginated<T>(
  classRef: Type<T>,
): Type<ICursorPaginatedType<T>> {
  @ObjectType(`cursor${classRef.name}Edge`)
  abstract class CursorEdgeType {
    @Field(() => String)
    cursor!: string;

    @Field(() => classRef)
    node!: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class CursorPaginatedType implements ICursorPaginatedType<T> {
    @Field(() => [CursorEdgeType], { nullable: true })
    edges!: CursorEdgeType[];

    @Field(() => Int)
    totalDocs!: number;

    @Field({ nullable: true })
    nextCursor!: string | null;

    @Field(() => Int)
    totalPages!: number;

    @Field(() => CursorPaginationArgs)
    pageInfo!: CursorPaginationArgs;
  }

  return CursorPaginatedType as Type<ICursorPaginatedType<T>>;
}

@ObjectType()
@ArgsType()
export class CursorPaginationArgs {
  @Field({ nullable: true })
  cursor!: string | null;

  @Field(() => Int, { defaultValue: 20 })
  take: number = 20;
}

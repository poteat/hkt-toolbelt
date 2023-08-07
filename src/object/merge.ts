import { Kind, Type } from '..';

export type _$merge<
  A extends Record<string, unknown>,
  B extends Record<string, unknown>
> = Type._$display<{
  [K in keyof A | keyof B]: K extends keyof B
    ? B[K]
    : K extends keyof A
    ? A[K]
    : never;
}>;

interface Merge_T<A extends Record<string, unknown>> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<string, unknown>>
  ): _$merge<A, typeof x>;
}

export interface Merge extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Record<string, unknown>>): Merge_T<typeof x>;
}

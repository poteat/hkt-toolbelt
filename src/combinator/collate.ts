import { Kind, NaturalNumber, Number, Conditional, Type } from '..';

interface _$collate2<
  /**
   * The number of arguments to expect.
   */
  N extends number,
  /**
   * The current argument index.
   */
  I extends Number.Number = 0,
  /**
   * The tuple of arguments applied so far.
   */
  OUT extends unknown[] = [],
  /**
   * The next argument index, which is `I + 1`.
   */
  NEXT extends Number.Number = NaturalNumber._$increment<I>,
  /**
   * Whether we have reached the end of the list of arguments.
   */
  DONE extends boolean = Conditional._$equals<N, NEXT>
> extends Kind.Kind {
  f(
    x: this[Kind._]
  ): DONE extends true
    ? [...OUT, typeof x]
    : _$collate2<N, NEXT, [...OUT, typeof x]>;
}

/**
 * `Collate` is a combinator that takes a number `N` and returns a type-level
 * function of arity `N` that expects `N` arguments, and after all curried
 * applications will return a tuple of length `N`, containing the arguments
 * applied.
 */
export type _$collate<N extends number> = N extends 0 ? [] : _$collate2<N>;

/**
 * `Collate` is a combinator that takes a number `N` and returns a type-level
 * function of arity `N` that expects `N` arguments, and after all curried
 * applications will return a tuple of length `N`, containing the arguments
 * applied.
 *
 * @param N The arity of the type-level function to create.
 *
 * This is useful for creating type-level functions that are 'variadic' in the
 * sense that they can take in a specified number of arguments.
 *
 * Additionally, this can be used in conjunction with `Uncurry` to "lift"
 * arguments out of function composition.
 *
 * If zero is passed in, an empty tuple is immediately returned.
 *
 * @example
 * ```ts
 * import { $, Kind, Type } from "ts-toolbelt"
 *
 * type Take2 = $<Kind.Collate, 2>
 *
 * type Result = $<$<Take2, "foo">, "bar"> // ["foo", "bar"]
 * ```
 */
export interface Collate extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], number>): _$collate<typeof x>;
}

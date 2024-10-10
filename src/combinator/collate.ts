import { Kind, Type } from '..'

export interface _$collate2<
  /**
   * The number of arguments to expect.
   */
  N extends number,
  /**
   * The tuple of arguments applied so far.
   */
  OUT extends unknown[] = []
> extends Kind.Kind {
  f(
    x: this[Kind._]
  ): N extends [...OUT, typeof x]['length']
    ? [...OUT, typeof x]
    : _$collate2<N, [...OUT, typeof x]>
}

/**
 * `Collate` is a combinator that takes a number `N` and returns a type-level
 * function of arity `N` that expects `N` arguments, and after all curried
 * applications will return a tuple of length `N`, containing the arguments
 * applied.
 */
export type _$collate<N extends number> = N extends 0 ? [] : _$collate2<N>

/**
 * `Collate` is a combinator that takes a number `N` and returns a type-level
 * function of arity `N` that expects `N` arguments, and after all curried
 * applications will return a tuple of length `N`, containing the arguments
 * applied.
 *
 * @template {number} N - The arity of the type-level function to create.
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
  f(x: Type._$cast<this[Kind._], number>): _$collate<typeof x>
}

/**
 * Given a number N, take in N curried elements and return a list of N length.
 *
 * @param {number} n - The number of elements to collate.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.collate(2)("foo")("bar")
 * //    ^? ["foo", "bar"]
 * ```
 */
export const collate = ((n: number) => {
  const collector =
    (values: unknown[] = []) =>
    (value: unknown) => {
      const newValues = [...values, value]
      if (newValues.length === n) {
        return newValues
      } else {
        return collector(newValues)
      }
    }
  return collector()
}) as Kind._$reify<Collate>

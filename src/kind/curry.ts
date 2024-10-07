import { $, Kind, Number, NaturalNumber, Conditional, Type, Function } from '..'

/**
 * `_$curry` takes in a positive natural number `N` and a type-level function
 * `K`, which expects a tuple of length `N`, and returns a curried type-level
 * function with `N` arity.
 *
 * The resultant type-level function expects `N` arguments, applied via nested
 * `$` applications.
 *
 * Internally, `_$curry` keeps an internal tuple that it appends to as each
 * argument is applied. Once the tuple has `N` elements, it applies the
 * type-level function `K` to the tuple.
 *
 * @template {Number.Number} N - The number of arguments to expect.
 * @template {Kind.Kind} K - The type-level function to curry.
 *
 * See `Combinator.Collate` for a similar combinator.
 */
export interface _$curry<
  /**
   * The number of arguments to expect.
   */
  N extends number,
  /**
   * The type-level function to curry.
   */
  K extends Kind.Kind,
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
    ? $<K, Type._$cast<[...OUT, typeof x], Kind._$inputOf<K>>>
    : _$curry<N, K, NEXT, [...OUT, typeof x]>
}

interface Curry_T<N extends number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): _$curry<N, typeof x>
}

/**
 * `Curry` is a combinator that takes in a positive natural number `N` and
 * a type-level function `K`, which expects a tuple of length `N`, and returns
 * a curried type-level function with `N` arity.
 *
 * The resultant type-level function expects `N` arguments, applied via nested
 * `$` applications. Alternatively, `$N` can be used to apply the arguments
 * as a tuple, i.e. through an 'uncurried' application.
 *
 * Internally, `Curry` keeps an internal tuple that it appends to as each
 * argument is applied. Once the tuple has `N` elements, it applies the
 * type-level function `K` to the tuple.
 *
 * @template {Number.Number} N - The number of arguments to expect.
 * @template {Kind.Kind} K - The type-level function to curry.
 *
 * See `Combinator.Collate` for a similar combinator.
 *
 * @example
 * ```ts
 * import { $, Kind, Type } from "ts-toolbelt"
 *
 * type Result = $N<Curry, [2, Function.Identity]>
 */
export interface Curry extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], number>): Curry_T<typeof x>
}

/**
 * Given a number of arguments N and a function F that takes in a N-tuple,
 * return a new function of arity N that wraps F.
 *
 * This converts a function that takes in a tuple to a function that takes in
 * a certain number of arguments, in a curried form.
 *
 * @param {number} n - The number of arguments to curry.
 * @param {Kind.Kind} f - The function to curry.
 *
 * @example
 * ```ts
 * import { Kind, Function } from "hkt-toolbelt";
 *
 * const myFcn = Kind.curry(2)(List.same)
 *
 * const result = myFcn(1)(2) // false
 * ```
 */
export const curry = ((n: number) => (f: Function.Function) => {
  const collector =
    (values: unknown[] = []) =>
    (value: unknown) => {
      const newValues = [...values, value]
      if (newValues.length === n) {
        return f(newValues as never)
      } else {
        return collector(newValues)
      }
    }
  return collector()
}) as Kind._$reify<Curry>

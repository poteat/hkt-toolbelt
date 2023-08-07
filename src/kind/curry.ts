import { $, Kind, Number, NaturalNumber, Conditional, Type } from '..'

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
 * @param N The number of arguments to expect.
 * @param K The type-level function to curry.
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
 * @param N The number of arguments to expect.
 * @param K The type-level function to curry.
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

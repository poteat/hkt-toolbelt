import { $, Kind, Type, Conditional, Function } from '..'
import { deepEqual } from '../_internal/deepEqual'

/**
 * `_$fix` is a type-level function that takes in a kind `K` and a value `X`,
 * and returns a new value that is the result of applying `K` to `X` until it
 * no longer returns a kind.
 *
 * @template {Kind.Kind} K - The kind to fix.
 * @template {unknown} X - The value to fix.
 *
 * @example
 * ```ts
 * import { Combinator, NaturalNumber } from "hkt-toolbelt";

 * type Result = Combinator._$fix<NaturalNumber.Decrement, 100>
 * //   ^? 0
 * ```
 */
export type _$fix<
  K extends Kind.Kind,
  X,
  NEXT_VALUE = $<K, Type._$cast<X, Kind._$inputOf<K>>>
> = Conditional._$equals<NEXT_VALUE, X> extends true ? X : _$fix<K, NEXT_VALUE>

interface Fix_T<K extends Kind.Kind> extends Kind.Kind {
  f(x: this[Kind._]): _$fix<K, typeof x>
}

/**
 * `Fix` is a type-level function that takes in a kind `K` and a value `X`,
 * and returns a new value that is the result of applying `K` to `X` until it
 * no longer returns a kind.
 *
 * @template {Kind.Kind} K - The kind to fix.
 * @template {unknown} X - The value to fix.
 *
 * @example
 * ```ts
 * import { Combinator, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<$<Combinator.Fix, NaturalNumber.Decrement>, 100>
 * //   ^? 0
 * ```
 */
export interface Fix extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): Fix_T<typeof x>
}

/**
 * Given a higher-order type and a value, loop until a fixed point is found.
 *
 * @param {Kind.Kind} f - The kind for which the fixed-point sequence is calculated.
 * @param {unknown} x - The initial value to start the loop with.
 *
 * @example
 * ```ts
 * import { Combinator, NaturalNumber } from "hkt-toolbelt";
 *
 * const result = Combinator.fix(NaturalNumber.decrement)(100)
 * //    ^? 0
 * ```
 */
export const fix = ((f: Function.Function) => (x: unknown) => {
  let value = x
  let prevValue = x

  do {
    prevValue = value
    value = f(value as never)
  } while (!deepEqual(prevValue, value))

  return value
}) as unknown as Kind._$reify<Fix>

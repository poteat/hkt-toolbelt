import { $, Kind, NaturalNumber, Object, Type, Function } from '..'

type _$countBy2<
  F extends Kind.Kind,
  T extends unknown[],
  O extends Record<string | number | symbol, number> = {}
> = T extends [infer Head extends Kind._$inputOf<F>, ...infer Tail]
  ? _$countBy2<
      F,
      Tail,
      $<F, Head> extends infer NewKey extends PropertyKey
        ? Object._$assign<
            NewKey,
            NewKey extends keyof O ? NaturalNumber._$increment<O[NewKey]> : 1,
            O
          >
        : never
    >
  : O

/**
 * `_$countBy` is a type-level function that takes in a kind `K` that returns a
 * string, number, or symbol, and a list `T`, and returns a map of the counts
 * of the elements in `T` mapped by the result of applying `K` to each element.
 *
 * @template {Kind} F - The kind that returns a string, number, or symbol.
 * @template {unknown[]} T - The list to count the elements of.
 *
 * @example
 * ```ts
 * type T0 = _$countBy<Function.Identity, ['foo', 'foo', 'bar']> // { foo: 2, bar: 1 }
 * type T1 = _$countBy<String.Length, ['foo', 'foo', 'quxes']> // { 3: 2, 5: 1 }
 * ```
 */
export type _$countBy<
  F extends Kind.Kind,
  T extends unknown[],
  O extends Record<string | number | symbol, number> = {}
> = Type._$display<_$countBy2<F, T, O>>

export interface CountBy_T<F extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$countBy<F, typeof x>
}

/**
 * `CountBy` is a type-level function that takes in a kind `K` that returns a
 * string, number, or symbol, and a list `T`, and returns a map of the counts
 * of the elements in `T` mapped by the result of applying `K` to each element.
 *
 * @template {Kind} F - The kind that returns a string, number, or symbol.
 * @template {unknown[]} T - The list to count the elements of.
 *
 * @example
 * ```ts
 * type T0 = $<$<$<List.CountBy, Function.Identity>, ['foo', 'foo', 'bar']> // { foo: 2, bar: 1 }
 * type T1 = $<$<$<List.CountBy, String.Length>, ['foo', 'foo', 'quxes']> // { 3: 2, 5: 1 }
 * ```
 */
export interface CountBy extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): CountBy_T<typeof x>
}

/**
 * Given a list, return a new list containing the count of each unique element.
 *
 * @param {Kind.Kind} f - The function to apply to each element to get the key.
 * @param {unknown[]} values - The list to count the elements of.
 *
 * @example
 * ```ts
 * import { List, Function } from "hkt-toolbelt";
 *
 * const result = List.countBy(Function.identity)(['foo', 'foo', 'bar'])
 * //    ^? { foo: 2, bar: 1 }
 * ```
 */
export const countBy = ((f: Function.Function) => (values: unknown[]) => {
  const result = {} as Record<string | number | symbol, number>

  for (const element of values) {
    const key = f(element as never) as string | number | symbol

    if (key in result) {
      result[key]++
    } else {
      result[key] = 1
    }
  }

  return result
}) as Kind._$reify<CountBy>

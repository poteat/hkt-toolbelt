import { $, Kind, Type, Function } from '..'

/**
 * `_$juxtN` is a type-level function that takes in a list of kinds `K` and
 * a value `X`, and either returns a list of the results applied to `X`, or
 * another instance of `_$juxtN` for any remaining kinds in the resultant list.
 *
 * Arity is determined by the maximal arity of the kinds in the list.
 *
 * @template {Kind.Kind[]} K - The list of kinds to apply.
 * @template {unknown} X - The value to apply the kinds to.
 *
 * @example
 * ```ts
 * import { $, Kind, List } from "hkt-toolbelt";
 *
 * type MyJuxt = Kind._$juxtN<[NaturalNumber.Increment, NaturalNumber.Add], 1>;
 * //    ^? Kind.JuxtN_T<[2, NaturalNumber.Add_T<1>]>
 *
 * type Result = $<MyJuxt, 5>;
 * //    ^? [2, 6]
 * ```
 */
export type _$juxtN<K extends unknown[], X> = {
  [key in keyof K]: K[key] extends Kind.Kind
    ? $<K[key], Type._$cast<X, Kind._$inputOf<K[key]>>>
    : K[key]
} extends infer NewK extends unknown[]
  ? Kind.Kind<never> extends NewK[number]
    ? JuxtN_T<NewK>
    : NewK
  : never

interface JuxtN_T<K extends unknown[]> extends Kind.Kind {
  f(x: this[Kind._]): _$juxtN<K, typeof x>
}

/**
 * `JuxtN` is a type-level function that takes in a list of kinds `K` and
 * a value `X`, and either returns a list of the results applied to `X`, or
 * another instance of `JuxtN` for any remaining kinds in the resultant list.
 *
 * Arity is determined by the maximal arity of the kinds in the list.
 *
 * @template {Kind.Kind[]} K - The list of kinds to apply.
 * @template {unknown} X - The value to apply the kinds to.
 *
 * @example
 * ```ts
 * import { $, Kind, List } from "hkt-toolbelt";
 *
 * type MyJuxt = Kind.JuxtN<[NaturalNumber.Increment, NaturalNumber.Add], 1>;
 * //    ^? Kind.JuxtN_T<[2, NaturalNumber.Add_T<1>]>
 *
 * type Result = $<MyJuxt, 5>;
 * //    ^? [2, 6]
 * ```
 */
export interface JuxtN extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): JuxtN_T<typeof x>
}

/**
 * Given a list of kinds and a value, apply the kinds to the value. If any of
 * the kinds result in another kind, return a new instance of `JuxtN` for the
 * remaining kinds and take in a new input value until all kinds have been
 * exhausted.
 *
 * @param {Kind.Kind[]} fx - The list of kinds to apply.
 * @param {unknown} x - The value to apply the kinds to.
 *
 * @example
 * ```ts
 * import { Kind, NaturalNumber } from "hkt-toolbelt";
 *
 * const result = Kind.juxtN([NaturalNumber.increment, NaturalNumber.add])(1)(2)
 * //    ^? [2, 3]
 * ```
 */
export const juxtN = ((fx: Function.Function[]) => (x: unknown) => {
  const results = []
  let hasKindResult = false

  for (const f of fx) {
    const result = typeof f === 'function' ? f(x as never) : f

    if (typeof result === 'function') {
      hasKindResult = true
    }

    results.push(result)
  }

  if (hasKindResult) {
    return juxtN(results as Function.Function[])
  }

  return results
}) as unknown as Kind._$reify<JuxtN>

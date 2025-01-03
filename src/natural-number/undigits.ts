import { Type, Digit, Kind, String } from '..'

type _$simpleJoin<
  T extends (string | number)[],
  O extends string = ''
> = T extends [
  infer Head extends string | number,
  ...infer Tail extends (string | number)[]
]
  ? _$simpleJoin<Tail, `${O}${Head}`>
  : O

/**
 * Given a list of digits, return a natural number.
 *
 * @param {Digit.Digit[]} T - The list of digits.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type T0 = NaturalNumber._$undigits<[1, 2, 3]>; // 123
 * type T1 = NaturalNumber._$undigits<[4, 5, 6]>; // 456
 * ```
 */
export type _$undigits<T extends (string | number)[]> =
  _$simpleJoin<T> extends `${infer N extends number}` ? N : never

/**
 * Given a list of digits, return a natural number.
 *
 * @param {Digit.Digit[]} T - The list of digits.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type T0 = $<NaturalNumber.Undigits, [1, 2, 3]>; // 123
 * type T1 = $<NaturalNumber.Undigits, [4, 5, 6]>; // 456
 * ```
 */
export interface Undigits extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], (string | number)[]>): _$undigits<typeof x>
}

/**
 * Given a list of digits, return a natural number.
 *
 * @param {Digit.Digit[]} T - The list of digits.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * const T0 = NaturalNumber.undigits([1, 2, 3]); // 123
 * const T1 = NaturalNumber.undigits([4, 5, 6]); // 456
 * ```
 */
export const undigits = ((x: (string | number)[]) =>
  Number(String.fromList(x as string[]))) as Kind._$reify<Undigits>

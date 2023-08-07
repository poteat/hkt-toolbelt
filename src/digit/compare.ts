import { $, Digit, Kind, Type } from '../'

type _$compare_LUT = [
  [0, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
  [1,  0, -1, -1, -1, -1, -1, -1, -1, -1], 
  [1,  1,  0, -1, -1, -1, -1, -1, -1, -1], 
  [1,  1,  1,  0, -1, -1, -1, -1, -1, -1], 
  [1,  1,  1,  1,  0, -1, -1, -1, -1, -1], 
  [1,  1,  1,  1,  1,  0, -1, -1, -1, -1], 
  [1,  1,  1,  1,  1,  1,  0, -1, -1, -1], 
  [1,  1,  1,  1,  1,  1,  1,  0, -1, -1], 
  [1,  1,  1,  1,  1,  1,  1,  1,  0, -1], 
  [1,  1,  1,  1,  1,  1,  1,  1,  1,  0],
];

/**
 * `_$compare` is a type-level function that takes two decimal digit types,`A` and `B`,
 * and returns the comparison status {-1, 0 or 1}. 
 * 
 * It returns `1` if A > B, `-1` if A < B and `0` if A === B.
 *
 * @param A A one-character decimal digit type.
 * @param B A one-character decimal digit type.
 *
 * @example
 * For example, forwarding two decimal digits `7` and `4` will result in 1:
 *
 * ```ts
 * import { Digit } from "hkt-toolbelt";
 *
 * type Result = Digit._$compare<"7", "4">; // 1
 * ```
 */
export type _$compare<
  A extends Digit.Digit,
  B extends Digit.Digit,
  RESULT extends 1 | 0 | -1 = _$compare_LUT[A][B]
> = RESULT;

interface Compare_T<A extends Digit.Digit> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): _$compare<A, typeof x>;
}

/**
 * `Compare` is a type-level function that takes two decimal digit types, `A` and `B`,
 * compares their magnitudes, and returns the corresponding result {-1, 0, or 1}.
 *
 * ## Parameters
 * @param A A one-character decimal digit type.
 * @param B A one-character decimal digit type.
 *
 * @example
 * For example, we can use the `$` type-level applicator to apply `Compare` to two digits.
 * In this example, we compare the digits `7` and `4`.
 *
 * ```ts
 * import { Kind, $, Digit } from "hkt-toolbelt";
 *
 * type Result = $<$<Digit.Compare, "7">, "4">; // 1
 * ```
 */
export interface Compare extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): Compare_T<typeof x>;
}

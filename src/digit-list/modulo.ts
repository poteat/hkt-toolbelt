import { Kind, Type, DigitList } from '..';

/**
 * `_$modulo` is a type-level function that calculates the modulo of two digit lists.
 * Returns the result of the modulo operation.
 *
 * @param A - The first digit list.
 * @param B - The second digit list.
 *
 * @example
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = DigitList._$modulo<["1", "0"], ["3"]>; // ["1"]
 * ```
 */
export type _$modulo<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList
> = DigitList._$divide<A, B, 'MODULO'>;

interface Modulo_T<T extends DigitList.DigitList> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$modulo<T, typeof x>;
}

/**
 * `Modulo` is a type-level function that calculates the modulo of two digit lists.
 * Returns the result of the modulo operation.
 *
 * @param A - The first digit list.
 * @param B - The second digit list.
 *
 * @example
 * For example, we can use `Modulo` to calculate the modulo of two digit lists:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<$<DigitList.Modulo, ["1", "0"]>, ["3"]>; // ["1"]
 * ```
 *
 * In this example, `Result` is a type that represents ["1"], which is the modulo of the division of ["1", "0"] by ["3"].
 */
export interface Modulo extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): Modulo_T<typeof x>;
}

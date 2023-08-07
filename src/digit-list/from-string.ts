import { Kind, Type, DigitList, Digit } from '..';

export type _$fromString2<
  T extends string,
  M extends DigitList.DigitList = []
> = T extends `${infer D extends Digit.Digit}${infer Rest}`
  ? _$fromString2<Rest, [...M, D]>
  : M;

/**
 * `_$fromString` is a type-level function that converts a string into a digit list and trims leading zeros.
 *
 * @param T - The string to be converted into a digit list.
 *
 * @example
 * ```ts
 * import { DigitList } from "..";
 *
 * type Result = DigitList._$fromString<"00123">; // ["1", "2", "3"]
 * ```
 */
export type _$fromString<T extends string> = DigitList._$trim<_$fromString2<T>>;

/**
 * `FromString` is a type-level function that converts a string into a digit list and trims leading zeros.
 * It returns a digit list from a string.
 *
 * @param A - The string to be converted into a digit list.
 *
 * @example
 * For example, we can use `FromString` to convert a string into a digit list:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<DigitList.FromString, "123">; // ["1", "2", "3"]
 * ```
 *
 * @example
 * Also we can use `FromString` to convert a string into a digit list and trim leading zeros.
 *
 * ```ts
 * import { $, DigitList, Type } from "hkt-toolbelt";
 *
 * type Result = $<DigitList.FromString, "00123">; // ["1", "2", "3"]
 * ```
 *
 */
export interface FromString extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$fromString<typeof x>;
}

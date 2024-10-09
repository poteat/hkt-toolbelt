import { Type, DigitList, Kind } from '..'

/**
 * `_$toHex` is a type-level function that takes in a digit list `T`, and
 * returns a list of the hex digits of `T`, represented as individual digit
 * lists between ["0"] and ["1", "5"].
 *
 * @template T - The digit list to convert.
 *
 * @example
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = DigitList._$toHex<["1", "2", "3"]>; // [["7"], ["1", "1"]]
 * ```
 */
export type _$toHex<
  T extends DigitList.DigitList,
  O extends unknown[] = [],
  DIV = DigitList._$divide<T, ['1', '6']>,
  MOD = DigitList._$modulo<T, ['1', '6']>
> = 0 extends 1
  ? never
  : DIV extends ['0']
    ? [MOD, ...O]
    : _$toHex<Type._$cast<DIV, DigitList.DigitList>, [MOD, ...O]>

/**
 * `ToHex` is a type-level function that takes in a digit list `T`, and
 * returns a list of the hex digits of `T`, represented as individual digit
 * lists between ["0"] and ["1", "5"].
 *
 * @template T - The digit list to convert.
 *
 * @example
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<DigitList.ToHex, ["1", "2", "3"]>; // [["7"], ["1", "1"]]
 * ```
 */
export interface ToHex extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$toHex<typeof x>
}

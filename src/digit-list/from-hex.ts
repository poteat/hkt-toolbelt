import { Kind, Type, DigitList, Digit } from '..'

/**
 * `_$fromHex` is a type-level function that takes in a list of hex digits
 * `T`, and returns a list of decimal digits. The hex digits are represented
 * as individual digit lists between ["0"] and ["1", "5"].
 *
 * @template T - The list of hex digits.
 *
 * @example
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = DigitList._$fromHex<[["7"], ["1", "1"]]>; // ["1", "2", "3"]
 * ```
 */
type _$fromHex<
  T extends DigitList.DigitList[],
  /**
   * The unit value of the current place. Multiplies by 16 on every iteration.
   */
  PLACE_MUL extends DigitList.DigitList = ['1'],
  /**
   * The current sum of places that have been processed so far.
   */
  SUM extends DigitList.DigitList = ['0'],
  /**
   * The next place value, multiplied by 16.
   */
  NEXT_PLACE_MUL extends DigitList.DigitList = DigitList._$multiply<
    PLACE_MUL,
    ['1', '6']
  >
> = T extends [
  ...infer Init extends DigitList.DigitList[],
  infer Last extends DigitList.DigitList
]
  ? _$fromHex<
      Init,
      NEXT_PLACE_MUL,
      DigitList._$add<SUM, DigitList._$multiply<PLACE_MUL, Last>>
    >
  : SUM

/**
 * `_$fromHex` is a type-level function that takes in a list of hex digits
 * `T`, and returns a list of decimal digits. The hex digits are represented
 * as individual digit lists between ["0"] and ["1", "5"].
 *
 * @template T - The list of hex digits.
 *
 * @example
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = $<DigitList.FromHex, [["7"], ["1", "1"]]>; // ["1", "2", "3"]
 * ```
 */
export interface FromHex extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList[]>): _$fromHex<typeof x>
}

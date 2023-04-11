import { DigitList, Kind, Type } from ".."

/**
 * Gets the element at the given index of the given string list. Returns
 * `undefined` if the index is out of bounds.
 */
export type _$at<
  /**
   * The string list to get the element from.
   */
  INPUT extends string[],
  /**
   * The index of the element to get.
   */
  INDEX extends DigitList.DigitList,
  /**
   * The index of the element to get, as a number.
   */
  JOINED_INDEX extends number = DigitList._$toNumber<INDEX>,
  /**
   * The element at the given index.
   */
  RESULT extends string = INPUT[JOINED_INDEX]
> = RESULT

export interface At extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string[]>): _$at<typeof x, DigitList.DigitList>
}

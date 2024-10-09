import {
  Kind,
  Type,
  Number as Number_,
  NaturalNumber,
  DigitList,
  String
} from '..'

type _$digitToHexMap = {
  0: '0'
  1: '1'
  2: '2'
  3: '3'
  4: '4'
  5: '5'
  6: '6'
  7: '7'
  8: '8'
  9: '9'
  10: 'a'
  11: 'b'
  12: 'c'
  13: 'd'
  14: 'e'
  15: 'f'
}

/**
 * `_$toHex` is a type-level function that takes in a natural number `T`, and
 * returns the corresponding hex string, using lowercase letters.
 *
 * @template T - The natural number to convert.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = NaturalNumber._$toHex<999>; // '3e7'
 */
export type _$toHex<
  T extends Number_.Number,
  HEX_LIST = DigitList._$toHex<NaturalNumber._$toList<T>>
> = String._$join<
  Type._$cast<
    {
      [K in keyof HEX_LIST]: _$digitToHexMap[Type._$cast<
        DigitList._$toNumber<Type._$cast<HEX_LIST[K], DigitList.DigitList>>,
        keyof _$digitToHexMap
      >]
    },
    string[]
  >
>

/**
 * `ToHex` is a type-level function that takes in a natural number `T`, and
 * returns the corresponding hex string, using lowercase letters.
 *
 * @template T - The natural number to convert.
 *
 * @example
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<NaturalNumber.ToHex, 999>; // '3e7'
 * ```
 */
export interface ToHex extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number_.Number>): _$toHex<typeof x>
}

/**
 * Given a natural number, return the corresponding hex string, using lowercase
 * letters.
 *
 * @param {Number_.Number} x - The natural number to convert.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * const result = NaturalNumber.toHex(999)
 * //    ^? '3e7'
 * ```
 */
export const toHex = ((x: Number_.Number) =>
  x.toString(16)) as Kind._$reify<ToHex>

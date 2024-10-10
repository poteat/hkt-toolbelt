import { Kind, Type, DigitList, String } from '..'

type _$hexToDigitMap = {
  '0': ['0']
  '1': ['1']
  '2': ['2']
  '3': ['3']
  '4': ['4']
  '5': ['5']
  '6': ['6']
  '7': ['7']
  '8': ['8']
  '9': ['9']
  a: ['1', '0']
  b: ['1', '1']
  c: ['1', '2']
  d: ['1', '3']
  e: ['1', '4']
  f: ['1', '5']
  A: ['1', '0']
  B: ['1', '1']
  C: ['1', '2']
  D: ['1', '3']
  E: ['1', '4']
  F: ['1', '5']
}

/**
 * `_$fromHex` is a type-level function that takes in a string `T` representing
 * a hexadecimal number, and returns a decimal number.
 *
 * @template T - The string to convert.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = NaturalNumber._$fromHex<'fff'>; // 4095
 * ```
 */
export type _$fromHex<
  T extends string,
  LIST = String._$toList<T>
> = DigitList._$toNumber<
  DigitList._$fromHex<
    Type._$cast<
      {
        [K in keyof LIST]: _$hexToDigitMap[Type._$cast<
          LIST[K],
          keyof _$hexToDigitMap
        >]
      },
      DigitList.DigitList[]
    >
  >
>

/**
 * `FromHex` is a type-level function that takes in a string `T` representing
 * a hexadecimal number, and returns a decimal number.
 *
 * @template T - The string to convert.
 *
 * @example
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<NaturalNumber.FromHex, 'fff'>; // 4095
 * ```
 */
export interface FromHex extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$fromHex<typeof x>
}

/**
 * Given a hexadecimal string, return the corresponding decimal number.
 *
 * @param {string} x - The hexadecimal string to convert.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * const result = NaturalNumber.fromHex('fff')
 * //    ^? 4095
 * ```
 */
export const fromHex = ((x: string) =>
  Number.parseInt(x, 16)) as Kind._$reify<FromHex>

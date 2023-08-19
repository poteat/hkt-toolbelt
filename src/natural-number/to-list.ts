import { Type, Number, DigitList, Kind } from '..'

/**
 * A type-level utility that recursively breaks down a number into a list of its digits.
 * This utility is primarily used within the `NaturalNumber.ToList` interface.
 *
 * @template S The number to be converted into a list of digits.
 * @template O An accumulator used during the recursive breakdown process. Defaults to an empty list.
 *
 * @returns A list of digits representing the number. If the number is zero, it returns a list with a single '0'.
 *
 * @example
 * // Convert the number 42 into a list of digits:
 * type ListOfDigits = _$toList<42>; // This will be inferred as ['4', '2']
 */
export type _$toList<
  S extends Number.Number,
  O extends string[] = []
> = Number._$toString<S> extends `${infer Head}${infer Tail}`
  ? _$toList<Tail, [...O, Head]>
  : O extends DigitList.DigitList
  ? O
  : ['0']

/**
 * Represents a type-level utility to convert a natural number into a list of its digits.
 * The digits are represented as strings.
 *
 * @template F - The number to be converted.
 *
 * @returns A list of digits representing the number. If the number is not a natural number, it returns `never`.
 *
 * @example
 * // Convert the number 42 into a list of digits:
 * type ListOfDigits = $<NaturalNumber.ToList, 42>; // This will be inferred as ['4', '2']
 * // Convert the number 0 into a list of digits:
 * type ZeroList = $<NaturalNumber.ToList, 0>; // This will be inferred as ['0']
 */
export interface ToList extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? _$toList<typeof x> : never
}

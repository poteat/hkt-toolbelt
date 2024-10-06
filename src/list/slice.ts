import { NaturalNumber, Number, DigitList, Digit, Kind, Type, List } from '..'

/**
 * `_$slice` is a type-level function that extracts and returns a subtuple of specified range from a tuple type.
 *
 * It takes in three arguments: first, `T`, the tuple that is to be sliced,
 * then `START` and `END`, which respectively specify the inclusive start and exclusive end indices of a slice.
 * Both positive and negative indices are supported, with negative indices being normalized into zero-based indices under the hood.
 *
 * @template T - A tuple type.
 * @template START - An integer type.
 * @template END - An integer type.
 * @returns A list of types.
 *
 * A negative index counts back from the end of the input tuple.
 * If `START < 0`, `START + T["length"]` is used.
 * If `END < 0`, `END + T["length"]` is used.
 *
 * ## Basic Usage
 *
 * @example
 *
 * type MyList = ['a', 'b', 'c', 'd', 'e'];
 * // Slice the first two elements of `MyList`.
 * type Result1 = List._$slice<MyList, 0, 2>; // ['a', 'b']
 * // Slice the last two elements of `MyList`.
 * type Result2 = List._$slice<MyList, -2, 0>; // ['d', 'e']
 * // Slice the middle three elements of `MyList`.
 * type Result3 = List._$slice<MyList, 1, -1>; // ['b', 'c', 'd']
 *
 * ## Edge Cases
 *
 * If `RANGE` is not of length two, or any of its elements is not an integer, returns `never`.
 * If `START >= T["length"]`, returns empty tuple.
 * If `START < -T["length"]` or `START` is omitted, `START` is subsituted with 0.
 * If `END` is greater than or equal to the length of `T`, all elements up to the end are extracted.
 * If `END` is positioned before or at `START` after normalization, returns empty tuple.
 */
export type _$slice<
  T extends unknown[],
  START extends Number.Number,
  END extends Number.Number,
  T_LENGTH extends DigitList.DigitList = NaturalNumber._$toList<T['length']>,
  START_ABS extends DigitList.DigitList = NaturalNumber._$toList<
    Number._$absolute<START>
  >,
  END_ABS extends DigitList.DigitList = NaturalNumber._$toList<
    Number._$absolute<END>
  >,
  SHIFT_NORM extends
    DigitList.DigitList = Number._$isNatural<START> extends true
    ? START_ABS
    : DigitList._$compare<T_LENGTH, START_ABS> extends -1
      ? [Digit.Zero]
      : DigitList._$subtract<T_LENGTH, START_ABS>,
  POP_NORM extends DigitList.DigitList = Number._$isNatural<END> extends true
    ? DigitList._$compare<T_LENGTH, END_ABS> extends -1
      ? [Digit.Zero]
      : DigitList._$subtract<T_LENGTH, END_ABS>
    : END_ABS,
  SHIFT_COUNT extends Number.Number = DigitList._$toNumber<SHIFT_NORM>,
  POP_COUNT extends Number.Number = DigitList._$toNumber<POP_NORM>,
  RESULT extends List.List = List._$shiftN<
    List._$popN<T, POP_COUNT>,
    SHIFT_COUNT
  >
> = List._$every<Number.IsInteger, [START, END]> extends true ? RESULT : never

interface Slice_T2<START extends Number.Number, END extends Number.Number>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], List.List>): _$slice<typeof x, START, END>
}

interface Slice_T<START extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Slice_T2<START, typeof x>
}

/**
 * `Slice` is a type-level function that extracts and returns a subtuple of specified range from a tuple type.
 * It takes in three arguments: `START` and `END`, which respectively specify the inclusive start and exclusive end indices of a slice,
 * and `T`, the tuple that is to be sliced.
 * Both positive and negative indices are supported, with negative indices being normalized into zero-based indices under the hood.
 *
 * @template START - An integer type.
 * @template END - An integer type.
 * A negative index counts back from the end of the input tuple.
 * If `START < 0`, `START + T["length"]` is used.
 * If `END < 0`, `END + T["length"]` is used.
 * @template T - A tuple type.
 * @returns A list of types.
 *
 * ## Basic Usage
 *
 * We apply `Slice` to `START`, `END`, and `T` respectively using the `$` type-level applicator.
 *
 * @example
 * type MyList = ['a', 'b', 'c', 'd', 'e'];
 * // Slice the first two elements of `MyList`.
 * type Result1 = $<$<$<List.Slice, 0>, 2>, MyList>; // ['a', 'b']
 * // Slice the last two elements of `MyList`.
 * type Result2 = $<$<$<List.Slice, -2>, 0>, MyList>; // ['d', 'e']
 * // Slice the middle three elements of `MyList`.
 * type Result3 = $<$<$<List.Slice, 1>, -1>, MyList>; // ['b', 'c', 'd']
 *
 * ## Edge Cases
 *
 * If `START` or `END` is not an integer, returns `never`.
 * If `START >= T["length"]`, returns empty tuple.
 * If `START < -T["length"]` or `START` is omitted, `START` is subsituted with 0.
 * If `END` is greater than or equal to the length of `T`, all elements up to the end are extracted.
 * If `END` is positioned before or at `START` after normalization, returns empty tuple.
 */
export interface Slice extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Slice_T<typeof x>
}

/**
 * Given a list and a start and end index, return a slice of the list.
 *
 * @param {number} s - The start index.
 * @param {number} e - The end index.
 * @param {unknown[]} x - The list to slice.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.slice([1, 2, 3, 4, 5])(1)(3)
 * //    ^? [2, 3]
 * ```
 */
export const slice = ((s: number) => (e: number) => (x: unknown[]) =>
  x.slice(s, e)) as Kind._$reify<Slice>

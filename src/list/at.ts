import { DigitList, Kind, Type, Number, List, NaturalNumber } from '../'

type _$at2<
  /**
   * The list to extract the element from.
   */
  T extends List.List,
  /**
   * The index of the element to extract.
   */
  POS extends Number.Number,
  /**
   * The length of the list. Computed via taking the length of the tuple and
   * converting it to a natural number.
   */
  T_LENGTH extends DigitList.DigitList = NaturalNumber._$toList<T['length']>,
  /**
   * The absolute value of the index. Computed via taking the absolute value of
   * the index.
   */
  POS_ABS extends DigitList.DigitList = NaturalNumber._$toList<
    Number._$absolute<POS>
  >,
  /**
   * The normalized index. Computed via taking the absolute value of the index
   * if the index is negative, otherwise the index itself.
   */
  POS_NORM extends DigitList.DigitList = Number._$isNatural<POS> extends true
    ? DigitList._$compare<POS_ABS, T_LENGTH> extends -1
      ? POS_ABS
      : never
    : DigitList._$compare<T_LENGTH, POS_ABS> extends -1
      ? never
      : DigitList._$subtract<T_LENGTH, POS_ABS>,
  INDEX extends number = DigitList._$toNumber<POS_NORM>
> = POS_NORM extends never ? never : T[INDEX]

/**
 * `_$at` is a type-level function that retrieves and returns an element from a tuple type.
 *
 * It takes in two arguments: a tuple, and an integer specifying the index of the element to be accessed.
 * Both positive and negative indices are supported, with negative indices being normalized into zero-based indices under the hood.
 *
 * @template T - A tuple type.
 * @template POS - An integer type specifying the index of the element to be accessed.
 * @returns The element of `T` at index `POS`.
 *
 * ## Edge Cases
 *
 * If `POS` is greater than or equal to the length of `T`, returns `never`.
 * If `POS` is lesser than the negated length of `T`, returns `never`.
 * If `POS` is not a numeric type, returns `never`.
 *
 * @example
 * A negative index counts back from the end of the input tuple.
 *
 * type MyList = ['a', 'b', 'c', 'd', 'e'];
 *
 * type Head = List._$at<MyList, 0>; // 'a'
 * type Tail = List._$at<MyList, -1>; // 'e'
 *
 * type IsNever = List._$at<MyList, 5>;  // never
 * type IsNever2 = List._$at<MyList, -6>;  // never
 * ```
 */
export type _$at<
  T extends unknown[],
  POS extends Number.Number
> = number extends POS
  ? T[number]
  : Number._$isInteger<POS> extends true
    ? _$at2<T, POS>
    : never

interface At_T<X extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$at<typeof x, X>
}

/**
 * `At` is a type-level function that retrieves and returns an element from a tuple type.
 *
 * It takes in two arguments: a tuple, and an integer specifying the index of the element to be accessed.
 * Both positive and negative indices are supported, with negative indices being normalized into zero-based indices under the hood.
 *
 * @template T - A tuple type.
 * @template POS - An integer type specifying the index of the element to be accessed.
 * @returns The element of `T` at index `POS`.
 *
 * ## Edge Cases
 *
 * If `POS` is greater than or equal to the length of `T`, returns `never`.
 * If `POS` is lesser than the negated length of `T`, returns `never`.
 * If `POS` is not an integer type, returns `never`.
 *
 * @example
 * A negative index counts back from the end of the input tuple.
 *
 * type MyList = ['a', 'b', 'c', 'd', 'e'];
 *
 * type Head = $<$<List.At, 0>, MyList>; // 'a'
 * type Tail = $<$<List.At, -1>, MyList>; // 'e'
 *
 * type IsNever = $<$<List.At, 5>, MyList>;  // never
 * type IsNever2 = $<$<List.At, -6>, MyList>;  // never
 */
export interface At extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): At_T<typeof x>
}

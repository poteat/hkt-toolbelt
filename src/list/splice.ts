import {
  NaturalNumber,
  Number,
  DigitList,
  Digit,
  Kind,
  Type,
  List,
  Boolean
} from '..';

type _$splice2<
  T extends List.List,
  START extends Number.Number,
  DEL_COUNT extends DigitList.DigitList,
  INSERTS extends List.List,
  PRE extends List.List = [],
  POST extends List.List = T,
  T_LENGTH extends DigitList.DigitList = NaturalNumber._$toList<T['length']>,
  START_ABS extends DigitList.DigitList = NaturalNumber._$toList<
    Number._$absolute<START>
  >,
  START_NORM extends
    DigitList.DigitList = Number._$isNatural<START> extends true
    ? START_ABS
    : DigitList._$compare<T_LENGTH, START_ABS> extends -1
    ? [Digit.Zero]
    : DigitList._$subtract<T_LENGTH, START_ABS>,
  RESULT extends List.List = DigitList._$compare<
    START_NORM,
    NaturalNumber._$toList<T['length']>
  > extends 1 | 0
    ? List._$concat<INSERTS, T>
    : DEL_COUNT extends [Digit.Zero]
    ? START_NORM extends [Digit.Zero]
      ? [...PRE, ...INSERTS, ...POST]
      : _$splice2<
          T,
          DigitList._$toNumber<DigitList._$decrement<START_NORM>>,
          [Digit.Zero],
          INSERTS,
          List._$push<POST[0], PRE>,
          List._$shift<POST>
        >
    : START_NORM extends [Digit.Zero]
    ? [
        ...PRE,
        ...INSERTS,
        ...List._$shiftN<POST, DigitList._$toNumber<DEL_COUNT>>
      ]
    : _$splice2<
        T,
        DigitList._$toNumber<DigitList._$decrement<START_NORM>>,
        DEL_COUNT,
        INSERTS,
        List._$push<POST[0], PRE>,
        List._$shift<POST>
      >
> = RESULT;

/**
 * `_$splice` is a type-level function that changes the contents of a tuple type by removing or replacing existing elements and/or adding new elements.
 *
 * It takes in four arguments:
 * `T`, the tuple to splice,
 * `START`, the index at which to start changing the tuple.
 * `DEL_COUNT`, the number of elements to remove from `T` at the starting index,
 * `INSERTS`, an array of elements to insert into `T` at the starting index.
 *
 * Both positive and negative indices are supported for `START`. Negative indices will be normalized into zero-based indices.
 *
 * @param T The input tuple.
 * @param START An integer representing the index at which to start splicing.
 * A negative index counts back from the end of the input tuple.
 * If `START < 0`, `START + T["length"]` is used.
 * @param DEL_COUNT A natural number representing the number of elements to remove from T at the starting index.
 * @param INSERTS An array of elements to insert into T at the starting index.
 *
 * ## Usage
 *
 * @example
 * ```ts
 * import { $, List } from 'hkt-toolbelt';
 *
 * type MyList = [0, 1, 2, 3, 4]
 *
 * type Result1 = List._$splice<[0, 1, 2, 3, 4], 1, 2, []>; // [0, 3, 4]
 *
 * type Result2 = List._$splice<[0, 1, 2, 3, 4], 1, 2, ['a', 'b']>; // [0, 'a', 'b', 3, 4]
 *
 * type Result3 = List._$splice<[0, 1, 2, 3, 4], -2, 2, ['a', 'b']>; // [0, 1, 'a', 'b', 4]
 * ```
 *
 * ## Edge Cases
 *
 * If `START >= T["length"]`, no element will be deleted, but the method will behave as an adding function, adding as many elements as provided.
 * If `START < -T["length"]` or `START` is omitted, `START` is subsituted with 0.
 * If `DEL_COUNT`is greater than or equal to the number of elements after the position specified by `START`, then all the elements from `START` to the end of the array will be deleted.
 * If `START` is not an integer, or `DEL_COUNT` is not a natural number, returns never.
 *
 */
export type _$splice<
  T extends List.List,
  START extends Number.Number,
  DEL_COUNT extends Number.Number,
  INSERTS extends List.List,
  RESULT extends List.List = Boolean._$and<
    Number._$isInteger<START>,
    Number._$isNatural<DEL_COUNT>
  > extends true
    ? _$splice2<T, START, NaturalNumber._$toList<DEL_COUNT>, INSERTS>
    : never
> = RESULT;

interface Splice_T3<
  START extends Number.Number,
  DEL_COUNT extends Number.Number,
  INSERTS extends List.List
> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], List.List>
  ): _$splice<typeof x, START, DEL_COUNT, INSERTS>;
}

interface Splice_T2<
  START extends Number.Number,
  DEL_COUNT extends Number.Number
> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], List.List>
  ): Splice_T3<START, DEL_COUNT, typeof x>;
}

interface Splice_T<START extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Splice_T2<START, typeof x>;
}

/**
 * `Splice` is a type-level function that changes the contents of a tuple type by removing or replacing existing elements and/or adding new elements.
 *
 * It takes in four arguments:
 * `T`, the tuple to splice,
 * `START`, the index at which to start changing the tuple.
 * `DEL_COUNT`, the number of elements to remove from `T` at the starting index,
 * `INSERTS`, an array of elements to insert into `T` at the starting index.
 *
 * Both positive and negative indices are supported for `START`. Negative indices will be normalized into zero-based indices.
 *
 * @param T The input tuple.
 * @param START An integer representing the index at which to start splicing.
 * A negative index counts back from the end of the input tuple.
 * If `START < 0`, `START + T["length"]` is used.
 * @param DEL_COUNT A natural number representing the number of elements to remove from T at the starting index.
 * @param INSERTS An array of elements to insert into T at the starting index.
 *
 * ## Usage
 *
 * @example
 * ```ts
 * import { $, List } from 'hkt-toolbelt';
 *
 * type MyList = [0, 1, 2, 3, 4]
 *
 * type Result1 = $<$<$<$<List.Splice, 1>, 2>, []>, [0, 1, 2, 3, 4]>; // [0, 3, 4]
 *
 * type Result2 = $<<$<$<$<List.Splice, 1>, 2>, ['a', 'b']>, [0, 1, 2, 3, 4]>; // [0, 'a', 'b', 3, 4]
 *
 * type Result3 = $<$<$<$<List.Splice, -2>, 2>, ['a', 'b']>, [0, 1, 2, 3, 4]>; // [0, 1, 'a', 'b', 4]
 * ```
 *
 * ## Edge Cases
 *
 * If `START >= T["length"]`, no element will be deleted, but the method will behave as an adding function, adding as many elements as provided.
 * If `START < -T["length"]` or `START` is omitted, `START` is subsituted with 0.
 * If `DEL_COUNT`is greater than or equal to the number of elements after the position specified by `START`, then all the elements from `START` to the end of the array will be deleted.
 * If `START` is not an integer, or `DEL_COUNT` is not a natural number, returns never.
 *
 */
export interface Splice extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Splice_T<typeof x>;
}

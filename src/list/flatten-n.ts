import { DigitList, Kind, Number, Type, NaturalNumber, Digit, List } from '..'

type _$flattenN2<
  T extends unknown[],
  N extends DigitList.DigitList,
  N_NEXT extends DigitList.DigitList = DigitList._$decrement<N>,
  RESULT extends List.List = N extends [Digit.Zero]
    ? T
    : _$flattenN2<_$flattenShallow<T>, N_NEXT>
> = RESULT

type _$flattenShallow<
  T extends unknown[],
  RESULT extends List.List = T extends [infer H, ...infer R]
    ? H extends unknown[]
      ? [...H, ..._$flattenShallow<R>]
      : [H, ..._$flattenShallow<R>]
    : []
> = RESULT

/**
 * `_$flattenN` is a type-level function that flattens a tuple up to a specified depth level by recursively concatenating nested subtuple elements.
 *
 * @template T - The input tuple.
 * @template N - Natural number specifying the depth level by which a nested tuple should be flattened.
 * If N is greater than or equal to the depth of the input tuple `T`, `T` will be flattened completely.
 * @returns A single depth-level list of types.
 *
 * @example
 * type MyList = [0, [1, [2, [3, [4]]]]]
 * type Result1 = List._$flattenN<MyList, 1> // [0, 1, [2, [3, [4]]]]
 * type Result2 = List._$flattenN<MyList, 2> // [0, 1, 2, [3, [4]]]
 * type Result3 = List._$flattenN<MyList, 4> // [0, 1, 2, 3, 4]
 * type Result4 = List._$flattenN<MyList, 5> // [0, 1, 2, 3, 4]
 */
export type _$flattenN<
  T extends unknown[],
  N extends Number.Number,
  RESULT extends List.List = Number._$isNatural<N> extends true
    ? _$flattenN2<T, NaturalNumber._$toList<N>>
    : never
> = RESULT

interface FlattenN_T<N extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$flattenN<typeof x, N>
}

/**
 * `FlattenN` is a type-level function that flattens a tuple up to a specified depth level by recursively concatenating nested subtuple elements.
 *
 * @template T - The input tuple.
 * @template N - Natural number specifying the depth level by which a nested tuple should be flattened.
 * If N is greater than or equal to the depth of the input tuple `T`, `T` will be flattened completely.
 * @returns A single depth-level list of types.
 *
 * @example
 * type MyList = [0, [1, [2, [3, [4]]]]]
 * type Result1 = $<$<List.FlattenN, 1>, MyList> // [0, 1, [2, [3, [4]]]]
 * type Result2 = $<$<List.FlattenN, 2>, MyList> // [0, 1, 2, [3, [4]]]
 * type Result3 = $<$<List.FlattenN, 4>, MyList> // [0, 1, 2, 3, 4]
 * type Result4 = $<$<List.FlattenN, 5>, MyList> // [0, 1, 2, 3, 4]
 */
export interface FlattenN extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): FlattenN_T<typeof x>
}

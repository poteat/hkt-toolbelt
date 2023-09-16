import { Kind, Type, DigitList, Number, List, NaturalNumber } from '..'

/**
 * `_$repeat2` is a helper type-level function for `_$repeat` that recursively fills a tuple with elements of a specified type.
 *
 * @template FILL_TYPE - The type to fill the tuple with.
 * @template COUNTER - A digit list representing the number of times to fill the tuple with `FILL_TYPE`.
 * @template STATE - The current state of the tuple being filled.
 * @template STATE_LENGTH - The length of the current state of the tuple.
 * @template RESULT - The final result of the tuple after it has been filled.
 */
type _$repeat2<
  FILL_TYPE extends unknown,
  COUNTER extends DigitList.DigitList,
  STATE extends List.List = [],
  STATE_LENGTH extends DigitList.DigitList = NaturalNumber._$toList<
    STATE['length']
  >,
  RESULT extends List.List = DigitList._$compare<
    STATE_LENGTH,
    COUNTER
  > extends 0
    ? STATE
    : _$repeat2<FILL_TYPE, COUNTER, List._$push<FILL_TYPE, STATE>>
> = RESULT

/**
 * `_$repeat` is a type-level function that returns a tuple filled with multiple elements of a specified type.
 *
 * It takes in two arguments:
 * `T`, the type to repeat, and `N`, the number of times to repeat `T`.
 *
 * `_$repeat` can handle an output tuple length of up to 2137,
 * which is larger than 999, the maximum recursion depth limit of TypeScript.
 *
 * @template T - An unknown type.
 * @template N - A natural number.
 * @returns A list of types containing `N` counts of `T`.
 *
 * If `N` is not a natural number, returns `never`.
 *
 * @example
 * type Result = List._$repeat<"a", 3>; // ["a", "a", "a"]
 */
/**
 * `_$repeat` is a type-level function that returns a tuple filled with multiple elements of a specified type.
 *
 * It takes in two arguments:
 * `T`, the type to repeat, and `N`, the number of times to repeat `T`.
 *
 * `_$repeat` can handle an output tuple length of up to 2137,
 * which is larger than 999, the maximum recursion depth limit of TypeScript.
 *
 * @template T - An unknown type.
 * @template N - A natural number.
 * @returns A list of types containing `N` counts of `T`.
 *
 * If `N` is not a natural number, returns `never`.
 *
 * @example
 * type Result = List._$repeat<"a", 3>; // ["a", "a", "a"]
 */
export type _$repeat<
  T extends unknown,
  N extends Number.Number,
  RESULT extends List.List = Number._$isNatural<N> extends true
    ? _$repeat2<T, NaturalNumber._$toList<N>>
    : never
> = RESULT

/**
 * `Repeat_T` is an intermediate interface for currying.
 *
 * @template N - A natural number.
 */
interface Repeat_T<N extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown>): _$repeat<typeof x, N>
}

/**
 * `Repeat` is a type-level function that returns a tuple filled with multiple elements of a specified type.
 *
 * It takes in two arguments:
 * `T`, the type to repeat, and `N`, the number of times to repeat `T`.
 *
 * `Repeat` can handle an output tuple length of up to 2137,
 * which is larger than 999, the maximum recursion depth limit of TypeScript.
 *
 * @template T - An unknown type.
 * @template N - A natural number.
 * @returns A list of types containing `N` counts of `T`.
 *
 * If `N` is not a natural number, returns `never`.
 *
 * @example
 * type Result = $<$<List.Repeat, "a">, 3>; // ["a", "a", "a"]
 *
 * @example
 * By partially applying a type to `Repeat` using {@see {@link $}}
 * we can define a type-level function that can repeat that type multiple different number of times.
 *
 * type RepeatA = $<List.Repeat, "A">
 * type RepeatATwice = $<RepeatA, 2> // ["A", "A"]
 * type RepeatAFiveTimes = $<RepeatA, 5> // ["A", "A", "A", "A", "A"]
 */
/**
 * `Repeat` is a type-level function that returns a tuple filled with multiple elements of a specified type.
 *
 * It takes in two arguments:
 * `T`, the type to repeat, and `N`, the number of times to repeat `T`.
 *
 * `Repeat` can handle an output tuple length of up to 2137,
 * which is larger than 999, the maximum recursion depth limit of TypeScript.
 *
 * @template T - An unknown type.
 * @template N - A natural number.
 * @returns A list of types containing `N` counts of `T`.
 *
 * If `N` is not a natural number, returns `never`.
 *
 * @example
 * type Result = $<$<List.Repeat, "a">, 3>; // ["a", "a", "a"]
 *
 * @example
 * By partially applying a type to `Repeat` using {@see {@link $}}
 * we can define a type-level function that can repeat that type multiple different number of times.
 *
 * type RepeatA = $<List.Repeat, "A">
 * type RepeatATwice = $<RepeatA, 2> // ["A", "A"]
 * type RepeatAFiveTimes = $<RepeatA, 5> // ["A", "A", "A", "A", "A"]
 */
export interface Repeat extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Repeat_T<typeof x>
}

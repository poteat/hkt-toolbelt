import { Kind, Type, DigitList, Number, List, NaturalNumber } from "..";

type _$repeat2<
  FILL_TYPE extends unknown,
  COUNTER extends DigitList.DigitList,
  STATE extends List.List = [],
  STATE_LENGTH extends DigitList.DigitList = NaturalNumber._$toList<
    STATE["length"]
  >,
  RESULT extends List.List = DigitList._$compare<
    STATE_LENGTH,
    COUNTER
  > extends 0
    ? STATE
    : _$repeat2<FILL_TYPE, COUNTER, List._$push<FILL_TYPE, STATE>>
> = RESULT;

/**
 * `_$repeat` is a type-level function that returns a tuple filled with multiple elements of a specified type.
 *
 * It takes in two arguments:
 * `T`, the type to repeat, and `N`, the number of times to repeat `T`.
 *
 * `_$repeat` can handle an output tuple length of up to 2137,
 * which is larger than 999, the maximum recursion depth limit of TypeScript.
 *
 * ## Parameters
 *
 * @param T An unknown type.
 * @param N A natural number.
 * * If `N` is not a natural number, returns `never`.
 *
 * ## Basic Usage
 *
 * @example
 *
 * ```ts
 * import { $, List } from 'hkt-toolbelt';
 *
 * type Result = List._$repeat<"a", 3>; // ["a", "a", "a"]
 * ```
 *
 **/
export type _$repeat<
  T extends unknown,
  N extends Number.Number,
  RESULT extends List.List = Number._$isNatural<N> extends true
    ? _$repeat2<T, NaturalNumber._$toList<N>>
    : never
> = RESULT;

interface Repeat_T<N extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown>): _$repeat<typeof x, N>;
}

export interface Repeat extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Repeat_T<typeof x>;
}

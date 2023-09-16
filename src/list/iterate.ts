import { $, Type, Kind, Number, List, NaturalNumber } from '..'

/**
 * `_$iterate` is a type-level function that repeatedly applies a function over an input value for a given number of times,
 * and returns a list containing all of the intermediate results.
 *
 * @template F - The function to iterate with.
 * @template O - The initial input to the function.
 * @template N - The number of times to iterate.
 *
 * @example
 * type T0 = List._$iterate<$<Boolean.Xor, true>, true, 5> // [true, false, true, false, true]
 */
export type _$iterate<
  F extends Kind.Kind,
  O extends Kind._$inputOf<F>,
  N extends Number.Number,
  COUNT extends Number.Number = NaturalNumber._$decrement<N>,
  M extends Kind._$inputOf<F>[] = [O],
  CURR extends Kind._$inputOf<F> = O,
  ACC = $<F, CURR>,
  RESULT extends Kind._$inputOf<F>[] = COUNT extends 0
    ? M
    : ACC extends Kind._$inputOf<F>
    ? _$iterate<
        F,
        O,
        N,
        NaturalNumber._$decrement<COUNT>,
        List._$push<ACC, M>,
        ACC
      >
    : never
> = 0 extends 1 ? never : RESULT

interface Iterate_T2<F extends Kind.Kind, N extends Number.Number>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind._$inputOf<F>>): _$iterate<F, typeof x, N>
}

interface Iterate_T<F extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Iterate_T2<F, typeof x>
}

/**
 * `Iterate` is a type-level function that repeatedly applies a function over an input value for a given number of times,
 * and returns a list containing all of the intermediate results.
 *
 * @template F - The function to iterate with.
 * @template N - The number of times to iterate.
 * @template O - The initial input to the function.
 *
 * @example
 * type T0 = $<$<$<List.Iterate, $<Boolean.Xor, true>>, 5>, true> // [true, false, true, false, true]
 */
export interface Iterate extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): Iterate_T<typeof x>
}

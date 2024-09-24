import { $, Conditional, Kind, Type } from '..'

/**
 * `_$until` is a type-level function that takes in a looping clause kind, an
 * update kind, and an initial value, and returns a type that represents the
 * result of looping until the clause is satisfied.
 *
 * @template Clause - A type-level function that takes in a value and returns a
 * boolean indicating whether the loop should continue or not.
 * @template Updater - A type-level function that takes in a value and returns a
 * new value.
 * @template Initial - The initial value to start the loop with.
 *
 * @example
 * For example, we can use `_$until` to loop until a number is greater than 10:
 *
 * ```ts
 * import { $, NaturalNumber, Loop } from "hkt-toolbelt";
 *
 * type Result = Loop._$until<
 *   $<NaturalNumber.IsGreaterThan, 10>,
 *   $<NaturalNumber.Add, 1>,
 *   0
 * >; // 11
 * ```
 */
export type _$until<
  Clause extends Kind.Kind<(x: never) => boolean>,
  Updater extends Kind.Kind,
  Initial,
  VALUE = Initial
> = 0 extends 1
  ? never
  : VALUE extends never
    ? never
    : /**
       * This check seems necessary to convince the compiler that the loop is not
       * infinite, in the case of array values.
       */
      Conditional._$equals<
          Type._$assert<VALUE, never[]>['length'],
          number
        > extends true
      ? never
      : $<Clause, Type._$cast<VALUE, Kind._$inputOf<Clause>>> extends true
        ? VALUE
        : _$until<
            Clause,
            Updater,
            Initial,
            $<Updater, Type._$cast<VALUE, Kind._$inputOf<Updater>>>
          >

interface Until_T2<
  Clause extends Kind.Kind<(x: never) => boolean>,
  Updater extends Kind.Kind
> extends Kind.Kind {
  f(x: this[Kind._]): _$until<Clause, Updater, typeof x>
}

interface Until_T1<Clause extends Kind.Kind<(x: never) => boolean>>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): Until_T2<Clause, typeof x>
}

/**
 * `Until` is a type-level function that takes in a looping clause kind, an
 * update kind, and an initial value, and returns a type that represents the
 * result of looping until the clause is satisfied.
 *
 * @template Clause - A type-level function that takes in a value and returns a
 * boolean indicating whether the loop should continue or not.
 * @template Updater - A type-level function that takes in a value and returns a
 * new value.
 * @template Initial - The initial value to start the loop with.
 *
 * @example
 * For example, we can use `Until` to loop until a number is greater than 10:
 *
 * ```ts
 * import { $, NaturalNumber, Loop } from "hkt-toolbelt";
 *
 * type Result = $<
 *   $<Loop.Until, $<NaturalNumber.IsGreaterThan, 10>>,
 *   $<NaturalNumber.Add, 1>,
 *   0
 * >; // 11
 * ```
 */
export interface Until extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: never) => boolean>>
  ): Until_T1<typeof x>
}

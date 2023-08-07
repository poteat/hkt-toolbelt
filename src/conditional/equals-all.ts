import { Type, Kind, List, Conditional, Boolean } from "..";

/**
 * `_$equalsAll` is a type-level function that takes in an array of types `T`,
 * and returns `true` if all elements of `T` are equal or `T` is empty.
 *
 * @param T An array of types.
 * @param U A type.
 *
 * @example
 * For example, we can use `_$equalsAll` to determine whether a series of types are equal.
 * In this example, `[false, false, false]` is passed as a type argument to the
 * type-level function:
 *
 * ```ts
 * import { Conditional } from "hkt-toolbelt";
 *
 * type Result = Conditional._$equalsAll<[
 *  false,
 *  false,
 *  false,
 * ]>; // true
 *
 * @example
 * For example, we can use `_$equalsAll` to determine whether a series of type expressions are all equal to a second input type.
 * In this example, `[true, true]` and `unknown` are passed as type arguments to the
 * type-level function:
 *
 * ```ts
 * import { Conditional } from "hkt-toolbelt";
 *
 * type Result = Conditional._$equalsAll<[
 *  true,
 *  true,
 * ], unknown>; // false
 * ```
 *
 * @example
 * In this example, `[string | number | symbol, keyof any]` and `PropertyKey` are passed as type arguments to the
 * type-level function:
 *
 * ```ts
 * import { Conditional } from "hkt-toolbelt";
 *
 * type Result = Conditional._$equalsAll<[
 *  string | number | symbol,
 *  keyof any,
 * ], PropertyKey>; // true
 * ```
 */
export type _$equalsAll<T extends List.List, PREV = T[0]> = T extends [
  infer CURR,
  ...infer REST
]
  ? Conditional._$equals<PREV, CURR> extends false
    ? false
    : _$equalsAll<REST, CURR>
  : true;

/**
 * `EqualsAll` is a type-level function that takes in one array of types, `T`, and returns a
 * type-level function that returns `true` if all elements of `T` evaluate to the same type or `T` is empty,
 * and `false` if otherwise.
 *
 * @param T An array of types.
 *
 * @example
 * For example, we can use `EqualsAll` to determine whether multiple types are equal.
 * In this example, `EqualsAll` is a type-level function that returns `true` if all elements of its input evaluate as being equal.
 *
 * We apply this type-level function to `[false, false, false]` and `[true, false]` respectively using the `$` type-level applicator:
 *
 * ```ts
 * import { $, Conditional } from "hkt-toolbelt";
 *
 * type IsTrue = $<Conditional.EqualsAll, [false, false, false]>; // true
 * type IsNotTrue = $<Conditional.EqualsAll, [true, false]>; // false
 * ```
 */
export interface EqualsAll extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], List.List>): _$equalsAll<typeof x>;
}

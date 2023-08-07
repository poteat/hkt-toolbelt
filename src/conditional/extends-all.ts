import { Type, Kind, List, Conditional, Boolean } from '..'

/**
 * `_$extendsAll` is a type-level function that takes in an array of types `T` and a type `U`,
 * and returns `true` if and only if all elements of `T` extend `U`, or `T` is empty.
 * Otherwise it returns `false`.
 *
 * @param T An array of types.
 * @param U A type.
 *
 * @example
 * For example, we can use `_$extendsAll` to determine whether a series of type expressions all extend a second input type.
 * In this example, `[true, false]` and `boolean` are passed as type arguments to the
 * type-level function:
 *
 * ```ts
 * import { Conditional } from "hkt-toolbelt";
 *
 * type Result = Conditional._$extendsAll<[
 *  true,
 *  false,
 * ], boolean>; // true
 * ```
 *
 * @example
 * For example, we can use `_$extendsAll` to determine whether a series of types all extend the second input type.
 * In this example, `[string, number]` and `string | number` are passed as type arguments to the
 * type-level function:
 *
 * ```ts
 * import { Conditional } from "hkt-toolbelt";
 *
 * type Result = Conditional._$extendsAll<[
 *  string,
 *  number,
 * ], string | number>; // true
 * ```
 *
 * @example
 * In this example, `[unknown]` and `never` are passed as type arguments to the
 * type-level function:
 *
 * ```ts
 * import { Conditional } from "hkt-toolbelt";
 *
 * type Result = Conditional._$extendsAll<[
 *  unknown
 * ], never>; // false
 * ```
 */
export type _$extendsAll<T extends List.List, U extends unknown> = T extends [
  infer CURR,
  ...infer REST
]
  ? Conditional._$extends<U, CURR> extends false
    ? false
    : _$extendsAll<REST, U>
  : true

interface ExtendsAll_T<U extends unknown> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], List.List>): _$extendsAll<typeof x, U>
}

/**
 * `ExtendsAll` is a type-level function that takes in a type `U` and an array of types, `T`,
 * and returns a type-level function that returns `true` if all elements of `T` extend `U`,
 * and `false` if otherwise.
 *
 * If T is empty, `true` is returned.
 *
 * @param U A type.
 * @param T An array of types.
 *
 * @example
 * For example, we can use `ExtendsAll` to determine whether a series of types all extend a second input type.
 * In this example, we partially apply `ExtendsAll` to `string | number` and `never`, which result in
 * two type-level functions that return `true` if all elements of their input extend `string | number` and `never`, respectively.
 *
 * We then apply both of these partially applied functions to `[string, number]` using the `$` type-level applicator.
 *
 * ```ts
 * import { $, Conditional } from "hkt-toolbelt";
 *
 * type IsTrue = $<$<Conditional.ExtendsAll, string | number>, [string, number]>; // true
 * type IsNotTrue = $<$<Conditional.ExtendsAll, never>, [string, number]>; // false
 * ```
 */
export interface ExtendsAll extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown>): ExtendsAll_T<typeof x>
}

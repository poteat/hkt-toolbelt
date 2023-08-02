import { $, Type, Kind, List, Conditional, Boolean } from ".."

/**
 * `_$extendsAll` is a type-level function that takes in an array of types `T` and a type `U`,
 * and returns `true` if and only if all elements of `T` extend `U`.
 * Otherwise it returns `false`.
 *
 * ## Parameters
 *
 * @param T An array of types.
 * @param U A type.
 *
 * ## Examples
 *
 * @example
 *
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
 *
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
 *
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
export type _$extendsAll<
  T extends List.List,
  U extends unknown,
  APPLY = $<$<List.Map, $<Conditional.Extends, U>>, T>,
  RESULT extends boolean = APPLY extends boolean[]
    ? $<$<$<List.Reduce, Boolean.And>, true>, APPLY>
    : never
> = RESULT

interface ExtendsAll_T<T extends List.List> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown>): _$extendsAll<T, typeof x>
}

/**
 * `ExtendsAll` is a type-level function that takes in an array of types, `T`, and a type `U`
 * and return sa type-level function that returns `true` if all elements of `T` extend `U`,
 * and `false` if otherwise.
 *
 * @param T An array of types.
 * @param U A type.
 *
 * @example
 *
 * For example, we can use `ExtendsAll` to determine whether a series of types all extend a second input type.
 * In this example, we partially apply `ExtendsAll` to `[string, number]`, which results in a
 * type-level function that returns `true` if `string` and `number` both extend its input.
 *
 * We then apply this partially applied function to `string | number` and `never`
 * respectively using the `$` type-level applicator:
 *
 * ```ts
 * import { $, Conditional } from "hkt-toolbelt";
 *
 * type IsTrue = $<$<Conditional.ExtendsAll, [string, number]>, string | number>; // true
 * type IsNotTrue = $<$<Conditional.ExtendsAll, [string, number]>, never>; // false
 * ```
 */
export interface ExtendsAll extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], List.List>): ExtendsAll_T<typeof x>
}

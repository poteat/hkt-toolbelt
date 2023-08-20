import { Type, Kind } from '..'

/**
 * `_$or` is a type-level function that takes in two boolean types, `T` and
 * `U`, and returns the boolean result of applying the 'or' logical operation
 * on `T` and `U`. If either `T` or `U` is true, then `_$or` returns true,
 * otherwise it returns false.
 *
 * @template T - A boolean type.
 * @template U - A boolean type.
 *
 * @example
 * For example, we can use `_$or` to determine whether at least one of two boolean
 * types is true. In this example, `true` and `false` are passed as type arguments
 * to the type-level function:
 *
 * ```ts
 * import { Boolean } from "hkt-toolbelt";
 *
 * type Result = Boolean._$or<true, false>; // true
 * ```
 */
export type _$or<T extends boolean, U extends boolean> = [T, U] extends [
  false,
  false
]
  ? false
  : true

interface Or_T<T extends boolean> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$or<T, typeof x>
}

/**
 * `Or` is a type-level function that takes in two boolean types, `T` and
 * `U`, and returns the boolean result of applying the 'or' logical operation
 * on `T` and `U`.
 *
 * @template T - A boolean type.
 * @template U - A boolean type.
 *
 * @example
 * For example, we can use `Or` to determine whether at least one of two boolean
 * types is true. In this example, `true` and `false` are passed as type arguments
 * to the type-level function:
 *
 * We apply `Or` to `true` and `false` respectively using the `$` type-level
 * applicator:
 *
 * ```ts
 * import { $, Boolean } from "hkt-toolbelt";
 *
 * type Result = $<$<Boolean.Or, true>, false>; // true
 * ```
 */
export interface Or extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): Or_T<typeof x>
}

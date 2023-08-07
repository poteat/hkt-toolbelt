import { Type, Kind } from '..'

/**
 * `_$xnor` is a type-level function that takes in two boolean types, `T` and
 * `U`, and returns the boolean result of applying the 'xnor' logical operation
 * on `T` and `U`. If `T` and `U` are equal, then `_$xnor` returns true,
 * otherwise it returns false.
 *
 * @param T A boolean type.
 * @param U A boolean type.
 *
 * @example
 * For example, we can use `_$xnor` to determine whether two boolean types are
 * equal. In this example, `true` and `true` are passed as type arguments to the
 * type-level function:
 *
 * ```ts
 * import { Boolean } from "hkt-toolbelt";
 *
 * type Result = Boolean._$xnor<true, true>; // true
 * ```
 *
 * @example
 * In this example, `true` and `false` are passed as type arguments to the
 * type-level function:
 *
 * ```ts
 * import { Boolean } from "hkt-toolbelt";
 *
 * type Result = Boolean._$xnor<true, false>; // false
 * ```
 */
export type _$xnor<T extends boolean, U extends boolean> = T extends U
  ? true
  : false

interface Xnor_T<T extends boolean> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$xnor<T, typeof x>
}

/**
 * `Xnor` is a type-level function that takes in two boolean types, `T` and
 * `U`, and returns the boolean result of applying the 'xnor' logical operation
 * on `T` and `U`.
 *
 * @param T A boolean type.
 * @param U A boolean type.
 *
 * @example
 * For example, we can use `Xnor` to determine whether two boolean types are
 * equal. In this example, `true` and `true` are passed as type arguments to the
 * type-level function:
 *
 * We apply `Xnor` to `true` and `true` respectively using the `$` type-level
 * applicator:
 *
 * ```ts
 * import { $, Boolean } from "hkt-toolbelt";
 *
 * type Result = $<$<Boolean.Xnor, true>, true>; // true
 * ```
 *
 * @example
 * In this example, `true` and `false` are passed as type arguments to the
 * type-level function:
 *
 * We apply `Xnor` to `true` and `false` respectively using the `$` type-level
 * applicator:
 *
 * ```ts
 * import { $, Boolean } from "hkt-toolbelt";
 *
 * type Result = $<$<Boolean.Xnor, true>, false>; // false
 * ```
 *
 * The 'xnor' operation is a logical operation which stands for 'exclusive nor'.
 * The xnor operation returns true if and only if its operands are equal. It is
 * equivalent to the negation of the xor (exclusive or) operation.
 */
export interface Xnor extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): Xnor_T<typeof x>
}

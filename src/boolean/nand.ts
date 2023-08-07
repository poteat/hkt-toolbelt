import { Type, Kind } from '..';

/**
 * `_$nand` is a type-level function that takes in two boolean types, `T` and
 * `U`, and returns the boolean result of applying the 'nand' logical operation
 * on `T` and `U`. If both `T` and `U` are true, then `_$nand` returns false,
 * otherwise it returns true.
 *
 * @param T A boolean type.
 * @param U A boolean type.
 *
 * @example
 * For example, we can use `_$nand` to determine whether two boolean types are
 * not both true. In this example, `true` and `false` are passed as type
 * arguments to the type-level function:
 *
 * ```ts
 * import { Boolean } from "hkt-toolbelt";
 *
 * type Result = Boolean._$nand<true, false>; // true
 * ```
 */
export type _$nand<T extends boolean, U extends boolean> = [T, U] extends [
  true,
  true
]
  ? false
  : true;

interface Nand_T<T extends boolean> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$nand<T, typeof x>;
}

/**
 * `Nand` is a type-level function that takes in two boolean types, `T` and
 * `U`, and returns the boolean result of applying the 'nand' logical operation
 * on `T` and `U`.
 *
 * @param T A boolean type.
 * @param U A boolean type.
 *
 * @example
 * For example, we can use `Nand` to determine whether two boolean types are
 * not both true. In this example, `true` and `false` are passed as type
 * arguments to the type-level function:
 *
 * We apply `Nand` to `true` and `false` respectively using the `$` type-level
 * applicator:
 *
 * ```ts
 * import { $, Boolean } from "hkt-toolbelt";
 *
 * type Result = $<$<Boolean.Nand, true>, false>; // true
 * ```
 */
export interface Nand extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): Nand_T<typeof x>;
}

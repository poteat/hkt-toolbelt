import { Kind, Type } from '..'

/**
 * `_$xor` is a type-level function that takes in two boolean types, `T` and
 * `U`, and returns the boolean result of applying the 'exclusive or' (xor)
 * logical operation on `T` and `U`. If `T` and `U` are the same, then
 * `_$xor` returns false, otherwise it returns true.
 *
 * @template {boolean} T - A boolean type.
 * @template {boolean}U - A boolean type.
 *
 * @example
 * For example, we can use `_$xor` to determine whether two boolean types are
 * different. In this example, `true` and `false` are passed as type arguments
 * to the type-level function:
 *
 * ```ts
 * import { Boolean } from "hkt-toolbelt";
 *
 * type Result = Boolean._$xor<true, false>; // true
 * ```
 */
export type _$xor<T extends boolean, U extends boolean> = T extends U
  ? false
  : true

interface Xor_T<T extends boolean> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$xor<T, typeof x>
}

/**
 * `Xor` is a type-level function that takes in two boolean types, `T` and
 * `U`, and returns the boolean result of applying the 'exclusive or' (xor)
 * logical operation on `T` and `U`.
 *
 * @template {boolean} T - A boolean type.
 * @template {boolean} U - A boolean type.
 *
 * @example
 * For example, we can use `Xor` to determine whether two boolean types are
 * different. In this example, `true` and `false` are passed as type arguments
 * to the type-level function:
 *
 * We apply `Xor` to `true` and `false` respectively using the `$` type-level
 * applicator:
 *
 * ```ts
 * import { $, Boolean } from "hkt-toolbelt";
 *
 * type Result = $<$<Boolean.Xor, true>, false>; // true
 * ```
 *
 * ### Exclusive Or (XOR) Operation
 *
 * The 'exclusive or' operation (XOR) is a logical operation that outputs true
 * only when the inputs differ. In other words, it returns false when the
 * inputs are the same.
 *
 * Here's a truth table for the XOR operation:
 *
 * | Input A | Input B | Output |
 * | ------- | ------- | ------ |
 * | true    | true    | false  |
 * | true    | false   | true   |
 * | false   | true    | true   |
 * | false   | false   | false  |
 *
 * The XOR operation can also be thought of as the negation of the equality
 * operation (i.e., `A !== B` is equivalent to `A ^ B`).
 */
export interface Xor extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): Xor_T<typeof x>
}

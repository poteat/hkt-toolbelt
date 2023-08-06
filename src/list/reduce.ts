import { $, Kind, Type, Function } from "..";

/**
 * `_$reduce` is a type-level function that takes in three inputs:
 * a) a partially-applied type-level function for a pairwise operation that is expecting two more arguments,
 * b) a list of types, c) a type specifying the initial argument that will be passed into the partially-applied function,
 * performs a reduce operation (also known as "fold") over the list input,
 * and returns the resulting type.
 *
 * The type-level function input must be a unary, curried `Kind` type as defined in this library, while being of arity 2 when uncurried.
 * @see {@link https://github.com/poteat/hkt-toolbelt/blob/main/docs/guides/custom-kinds.md} for details on how to create a custom kind.
 *
 * @param F A type-level function for a pairwise operation.
 * @param X A list of types. The target of the reduce operation.
 * @param O A type specifying the initial argument that will be taken by `F`.
 *          To use first element of `X` as the initial argument, simply pass in `Function.Identity`.
 *
 * @example
 *
 * For example, we can use `_$reduce` to derive the sum of all elements in a list of numeric types.
 *
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * type Sum1to10 = List._$reduce<NaturalNumber.Add, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0>;
 * ```
 */
export type _$reduce<
  F extends Kind.Kind<(x: never) => Kind.Kind>,
  X extends unknown[],
  O
> = 0 extends 1
  ? never
  : X extends [infer H, ...infer T]
  ? $<
      $<F, Type._$cast<O, Kind._$inputOf<F>>>,
      Type._$cast<
        H,
        Kind._$inputOf<
          Function._$returnType<
            (F & { readonly [Kind._]: Type._$cast<O, Kind._$inputOf<F>> })["f"]
          >
        >
      >
    > extends infer R
    ? _$reduce<F, T, R>
    : never
  : O;

interface Reduce_T2<F extends Kind.Kind<(x: never) => Kind.Kind>, X>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$reduce<F, typeof x, X>;
}

interface Reduce_T<F extends Kind.Kind<(x: never) => Kind.Kind>>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown>): Reduce_T2<F, typeof x>;
}

/**
 * `Reduce` is a type-level function that takes in three inputs:
 * a) a partially-applied type-level function for a pairwise operation that is expecting two more arguments,
 * b) a type specifying the initial argument that will be passed into this partially-applied function,
 * c) a target list of types, and performs a reduce operation (also known as "fold") over the target list,
 * and returns the resulting type.
 *
 * The type-level function input must be a unary, curried `Kind` type as defined in this library, while being of arity 2 if uncurried.
 * @see {@link https://github.com/poteat/hkt-toolbelt/blob/main/docs/guides/custom-kinds.md} for details on how to create a custom kind.
 *
 * @param F A type-level function for a pairwise operation.
 * @param O A type specifying the initial argument that will be taken by `F`.
 *          To use first element of `X` as the initial argument, simply pass in `Function.Identity`.
 * @param X A list of types. The target of the reduce operation.
 *
 * @example
 *
 * For example, we can use `Reduce` to derive the sum of all elements in a list of numeric types.
 *
 * ```ts
 * import { $, List } from "hkt-toolbelt";
 *
 * type Sum1to10 = $<$<$<List.Reduce, NaturalNumber.Add>, 0>, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]>;  // 55
 * ```
 *
 * @example
 *
 * We can also use the `$N` applicator to invoke `Reduce` with a list containing the required arguments
 * This improves readability by allowing us to avoid nesting `$` calls three level deep.
 *
 * ```ts
 * import { $N, List } from "hkt-toolbelt";
 *
 * type IsFalse = $N<List.Reduce, [
 *   Boolean.Xor,
 *   true,
 *   [false, true, false, true]
 * ]>;  // false
 * ```
 *
 * @example
 *
 * By partially applying only the first two arguments to `Reduce`,
 * we can define a type-level function that can apply the same operation to multiple list inputs.
 *
 * ```ts
 * import { $, $N, List, Number } from hkt-toolbelt;
 *
 * type GetMax = $N<List.Reduce, [Number.Max, Number.MIN_SAFE_INTEGER]>;
 * type IsZero = $<GetMax, [-5, -4, -3, -2, -1, 0];  // 0
 * type IsHundred = $<GetMax, [1, -1, 10, -10, 100, -100]>;  // 100
 * ```
 *
 * @example
 *
 * Another use case for a partially-applied `Reduce` function is to implement
 * sophisticated higher-order functionality by passing it into other type-level functions.
 *
 * ```ts
 * import { $, $N, List, Conditional, Number, String } from "hkt-toolbelt";
 *
 * type GetMinOrJoin = $N<Conditional.If, [
 *   $<Conditional.Extends, number[]>,
 *   $N<List.Reduce, [Number.Min, Number.MAX_SAFE_INTEGER]>,
 *   $<String.Join, ", ">,
 * ]>;
 *
 * type IsNegativeHundred = $<GetMinOrJoin, [1, -1, 10, -10, 100, -100]>;  // -100
 * type HelloWorld = $<GetMinOrJoin, ["hello", "world"]>;  // "hello, world"
 * ```
 */
export interface Reduce extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: never) => Kind.Kind>>
  ): Reduce_T<typeof x>;
}

import { $N, Kind, Type, List } from '..'

/**
 * `_$accumulate` is a type-level function that takes in three inputs:
 * a) a partially-applied type-level function for a pairwise operation that is expecting two more arguments,
 * b) a list of types, c) a type specifying the initial argument that will be passed into the partially-applied function,
 * and returns a list which contains the result of every intermediate accumulator value computed
 * while performing a reduce operation on the input list (also known as "cumulative fold").
 *
 * The type-level function input must be a unary, curried `Kind` type as defined in this library, while being of arity 2 when uncurried.
 * @see {@link https://github.com/poteat/hkt-toolbelt/blob/main/docs/guides/custom-kinds.md} for details on how to create a custom kind.
 *
 * @template F - A type-level function for a pairwise operation.
 * @template X - A list of types. The target of the accumulate operation.
 * @template O - A type specifying the initial argument that will be taken by `F`.
 *          To use the first element of `X` as the initial argument, simply pass in `Function.Identity`.
 * @returns A list of types containing the results of the accumulate operation.
 *
 * @example
 * For example, we can use `_$accumulate` to derive the sum of k = 1 to n for all elements n in a list of natural number types.
 *
 * type SummationSum1to10 = List._$accumulate<NaturalNumber.Add, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], []>; // [1, 3, 6, 10, 15, 21, 28, 36, 45, 55]
 */
export type _$accumulate<
  F extends Kind.Kind<(x: never) => Kind.Kind>,
  X extends List.List,
  O extends Kind._$inputOf<F>,
  M extends Kind._$inputOf<F>[] = [],
  CURR = List._$first<X>,
  REST extends List.List = List._$shift<X>,
  ACC = $N<F, [O, CURR]>,
  RESULT extends Kind._$inputOf<F>[] = X extends []
    ? M
    : ACC extends Kind._$inputOf<F>
    ? _$accumulate<F, REST, ACC, List._$push<ACC, M>>
    : never
> = 0 extends 1 ? never : RESULT

interface Accumulate_T2<
  F extends Kind.Kind<(x: never) => Kind.Kind>,
  O extends Kind._$inputOf<F>
> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], List.List>): _$accumulate<F, typeof x, O>
}

interface Accumulate_T<F extends Kind.Kind<(x: never) => Kind.Kind>>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind._$inputOf<F>>): Accumulate_T2<F, typeof x>
}

/**
 * `Accumulate` is a type-level function that takes in three inputs:
 * a) a partially-applied type-level function for a pairwise operation that is expecting two more arguments,
 * b) a type specifying the initial argument that will be passed into this partially-applied function,
 * c) a target list of types, and returns a list which contains the result of every intermediate accumulator value computed
 * while performing a reduce operation on the input list (also known as "cumulative fold").
 *
 * The type-level function input must be a unary, curried `Kind` type as defined in this library, while being of arity 2 if uncurried.
 * @see {@link https://github.com/poteat/hkt-toolbelt/blob/main/docs/guides/custom-kinds.md} for details on how to create a custom kind.
 *
 * @template F - A type-level function for a pairwise operation.
 * @template O - A type specifying the initial argument that will be taken by `F`.
 *          To use first element of `X` as the initial argument, simply pass in `Function.Identity`.
 * @template X - A list of types. The target of the accumulate operation.
 * @returns A list of types containing the results of the accumulate operation.
 *
 * @example
 * For example, we can use `Accumulate` to derive the sum of k = 1 to n for all elements n in a list of natural number types.
 *
 * type SummationSum1to10 = $<$<$<List.Accumulate, NaturalNumber.Add>, 0>, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]>; // [1, 3, 6, 10, 15, 21, 28, 36, 45, 55]
 *
 * @example
 * We can also use the `$N` applicator to invoke `Accumulate` with a list containing the required arguments
 * This improves readability by allowing us to avoid nesting `$` calls three level deep.
 *
 * type IsFalse = $N<List.Accumulate, [
 *   Boolean.Xor,
 *   true,
 *   [false, true, false, true]
 * ]>;  // [true, false, false, true]
 *
 * @example
 * By partially applying only the first two arguments to `Accumulate`,
 * we can define a type-level function that can apply the same operation to multiple list inputs.
 *
 * type GetMax = $N<List.Accumulate, [Number.Max, Number.MIN_SAFE_INTEGER]>;
 * type IsZero = $<GetMax, [-5, -4, -3, -2, -1, 0];  // [-5, -4, -3, -2, -1, 0]
 * type IsHundred = $<GetMax, [1, -1, 10, -10, 100, -100]>;  // [1, 1, 10, 10, 100, 100]
 *
 * @example
 * Another use case for a partially-applied `Accumulate` function is to implement
 * sophisticated higher-order functionality by passing it into other type-level functions.
 *
 * type GetMinOrJoin = $N<Conditional.If, [
 *   $<Conditional.Extends, number[]>,
 *   $N<List.Accumulate, [Number.Min, Number.MAX_SAFE_INTEGER]>,
 *   $<String.Join, ", ">,
 * ]>;
 * type IsNegativeHundred = $<GetMinOrJoin, [1, -1, 10, -10, 100, -100]>;  // [1, -1, -1, -10, -10, -100]
 * type HelloWorld = $<GetMinOrJoin, ["hello", "world"]>;  // "hello, world"
 */
export interface Accumulate extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: never) => Kind.Kind>>
  ): Accumulate_T<typeof x>
}

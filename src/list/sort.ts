import { $, Type, Kind, Number, Function } from '..'

/**
 * A version of `$` that doesn't check input type constraints.
 */
type $S<F, X> = $<
  Type._$cast<F, Kind.Kind>,
  Type._$cast<X, Kind._$inputOf<Type._$cast<F, Kind.Kind>>>
>

/**
 * A comparator may be one of two forms:
 *
 * - A 2-ary kind that takes in two values and returns a number.
 * - A 1-ary kind that takes in a value and returns a number.
 *
 * In the first case, we expect the 2-ary kind to return a negative number if
 * the first value is less than the second, a positive number if the first
 * value is greater than the second, and zero if the values are equal.
 *
 * In the second case, we use number comparison on the two results of applying
 * the kind to each value to compare them.
 */
type _$disambiguateComparator<F extends Kind.Kind, X, Y> =
  $S<F, X> extends Kind.Kind
    ? $S<$S<F, X>, Y>
    : Number._$compare<
        Type._$cast<$S<F, X>, Number.Number>,
        Type._$cast<$S<F, Y>, Number.Number>
      >

/**
 * Given a comparison function and a list, as well as a pivot, partition the
 * list into two lists, one of which is less than the pivot, and the other of
 * which is greater than or equal to the pivot.
 *
 * @param {Kind.Kind} f - The comparison function.
 * @param {number[]} values - The list to partition.
 * @param {number} pivot - The pivot value.
 */
type _$partition<
  F extends Kind.Kind,
  T extends unknown[],
  Pivot extends unknown,
  LessThan extends unknown[] = [],
  GreaterThan extends unknown[] = []
> = T extends [infer Head, ...infer Tail extends unknown[]]
  ? Number._$sign<
      Type._$cast<_$disambiguateComparator<F, Head, Pivot>, Number.Number>
    > extends '-'
    ? _$partition<F, Tail, Pivot, [...LessThan, Head], GreaterThan>
    : _$partition<F, Tail, Pivot, LessThan, [...GreaterThan, Head]>
  : [LessThan, GreaterThan]

/**
 * Wrap a value for disambiguating it from the active worklist.
 */
type _$wrap<T> = { value: T; __brand: never }

/**
 * `_$sort` is a type-level function that takes in a comparison function `F`,
 * a list `T`, and returns a sorted list of the same type.
 *
 * The comparison function `F` may either be a 2-ary kind that takes in two
 * values and returns a number, or a 1-ary kind that takes in a value and
 * returns a number.
 *
 * This function sorts from least to greatest by default.
 *
 * @template {Kind.Kind} F - The comparison function.
 * @template {unknown[]} T - The list to sort.
 *
 * @example
 * ```ts
 * import { List, String, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = List._$sort<String.Length, ['foo', 'bar', 'baz', 'x', 'qux', 'quux']>
 * //    ^? ['x', 'foo', 'bar', 'baz', 'qux', 'quux']
 * ```
 */
export type _$sort<
  F extends Kind.Kind,
  T extends unknown[],
  Output extends unknown[] = [],
  Worklist extends (unknown[] | _$wrap<unknown>)[] = []
> = T extends [infer Head, ...infer Tail extends unknown[]]
  ? _$partition<F, Tail, Head> extends [
      infer Lower extends unknown[],
      infer Higher extends unknown[]
    ]
    ? _$sort<F, [], Output, [Lower, _$wrap<Head>, Higher, ...Worklist]>
    : never
  : Worklist extends [
        infer Task,
        ...infer RestWorklist extends (unknown[] | _$wrap<unknown>)[]
      ]
    ? Task extends _$wrap<unknown>
      ? _$sort<F, [], [...Output, Task['value']], RestWorklist>
      : Task extends unknown[]
        ? _$sort<F, Task, Output, RestWorklist>
        : never
    : Output

interface Sort_T<F extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$sort<F, typeof x>
}

/**
 * `Sort` is a type-level function that takes in a comparison function `F`,
 * a list `T`, and returns a sorted list of the same type.
 *
 * The comparison function `F` may either be a 2-ary kind that takes in two
 * values and returns a number, or a 1-ary kind that takes in a value and
 * returns a number.
 *
 * This function sorts from least to greatest by default.
 *
 * @template {Kind.Kind} F - The comparison function.
 * @template {unknown[]} T - The list to sort.
 *
 * @example
 * ```ts
 * import { $, List, String, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<$<List.Sort, String.Length>, ['foo', 'bar', 'baz', 'x', 'qux', 'quux']>
 * //    ^? ['x', 'foo', 'bar', 'baz', 'qux', 'quux']
 * ```
 */
export interface Sort extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): Sort_T<typeof x>
}

/**
 * Given a comparison function and a list, return a sorted list of the same
 * type.
 *
 * The comparison function `F` may either be a 2-ary kind that takes in two
 * values and returns a number, or a 1-ary kind that takes in a value and
 * returns a number.
 *
 * This function sorts from least to greatest by default.
 *
 * @param {Kind.Kind} f - The comparison function.
 * @param {unknown[]} values - The list to sort.
 *
 * @example
 * ```ts
 * import { List, String, NaturalNumber } from "hkt-toolbelt";
 *
 * const result = List.sort(String.length)(['foo', 'bar', 'baz', 'x', 'qux', 'quux'])
 * //    ^? ['x', 'foo', 'bar', 'baz', 'qux', 'quux']
 * ```
 */
export const sort = ((f: Function.Function) => (values: unknown[]) => {
  const newValues = [...values]

  newValues.sort((a, b) => {
    const result = f(a as never) as number | Function.Function

    return typeof result === 'function'
      ? (result(a as never) as number)
      : result - (f(b as never) as number)
  })

  return newValues
}) as Kind._$reify<Sort>

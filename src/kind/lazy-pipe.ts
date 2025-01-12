import { $, Kind, Type, Function } from '..'

/**
 * Given a list of kinds, apply them in order to a value.
 *
 * This is similar to `Kind.Pipe`, but if the result of a kind is a kind, we return
 * a new pipe instead of sending the result to the next kind.
 *
 * @template {Kind.Kind[]} KX - A list of kinds to apply.
 * @template {unknown} X - The value to apply the kinds to.
 *
 * @example
 * ```ts
 * import { $, Kind, String } from "hkt-toolbelt";
 *
 * type Result = $<$<Kind.LazyPipe, [String.ToUpper, String.ToLower]>, "FOO">; // "foo"
 * ```
 */
export type _$lazyPipe<T extends Kind.Kind[], X> = T extends [
  infer Head extends Kind.Kind,
  ...infer Tail extends Kind.Kind[]
]
  ? [X] extends [never]
    ? never
    : $<Head, Type._$cast<X, Kind._$inputOf<Head>>> extends infer Result
      ? Result extends Kind.Kind
        ? LazyPipe_T<[LazyPipe_T<[Result]>, ...Tail]>
        : _$lazyPipe<Tail, Result>
      : never
  : X

interface LazyPipe_T<KX extends Kind.Kind[]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown>): _$lazyPipe<KX, typeof x>
}

/**
 * Given a list of kinds, apply them in order to a value.
 *
 * This is similar to `Kind.Pipe`, but if the result of a kind is a kind, we return
 * a new pipe instead of sending the result to the next kind.
 *
 * @template {Kind.Kind[]} KX - A list of kinds to apply.
 * @template {unknown} X - The value to apply the kinds to.
 *
 * @example
 * ```ts
 * import { $, Kind, String } from "hkt-toolbelt";
 *
 * type Result = $<$<Kind.LazyPipe, [String.ToUpper, String.ToLower]>, "FOO">; // "foo"
 * ```
 */
export interface LazyPipe extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind[]>): LazyPipe_T<typeof x>
}

/**
 * Given a list of kinds, apply them all to a value, returning a tuple of the
 * results.
 *
 * This is similar to `Kind.pipe`, but if the result of a kind is a kind, we return
 * a new pipe instead of sending the result to the next kind.
 *
 * @param {Kind.Kind[]} fx - A list of kinds to apply.
 * @param {unknown} x - The value to apply the kinds to.
 *
 * @example
 * ```ts
 * import { Kind, List } from "hkt-toolbelt";
 *
 * const result = Kind.lazyPipe([List.reverse])([1, 2, 3])
 * //    ^? [3, 2, 1]
 * ```
 */
export const lazyPipe = ((fx: Function.Function[]) => (input: unknown) => {
  let value = input

  for (let i = 0; i < fx.length; i++) {
    const f = fx[i]

    value = f(value as never)

    if (typeof value === 'function') {
      return lazyPipe([value, ...fx.slice(i + 1)] as never)
    }

    if (value === undefined) {
      return undefined
    }
  }

  return value
}) as Kind._$reify<LazyPipe>

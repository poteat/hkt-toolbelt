import { $, Type, Kind } from ".."

interface Apply_T<X> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: X) => unknown>>
  ): $<
    typeof x,
    Type._$cast<
      X,
      Kind._$inputOf<Type._$cast<this[Kind._], Kind.Kind<(x: X) => unknown>>>
    >
  >
}

/**
 * `Apply` is a type-level function that takes in a single type argument,
 * `X`, and returns a type-level function that takes in a single type
 * argument, `F`, and returns the type `$<F, X>`.
 *
 * @param X The type to apply.
 * @param F The type-level function to apply `X` to.
 *
 * In a sense, `Apply` is the type-level equivalent of the combinator
 * `x => f => f(x)`. It is used to 'apply' a value to a type-level function.
 *
 * In another sense, it can be viewed as the contrapositive of `$`.
 *
 * @example
 *
 * For example, we can use `Apply` to apply a type-level string to a list of
 * type-level functions. In this case, we apply the string `"foo"`:
 *
 * ```ts
 * import { $, Kind, String } from "hkt-toolbelt"
 *
 * type ApplyFoo = $<Kind.Apply, "foo">;
 * ```
 *
 * @example
 *
 * Next, we apply the `ApplyFoo` type to the list of functions `[String.Length, String.ToUpperCase]`:
 *
 * ```ts
 * import { $, $N, List, Kind, String } from "hkt-toolbelt"
 *
 * type Result = $N<
 *   List.Map,
 *   [
 *     ApplyFoo,
 *     [String.Length, String.ToUpper]
 *   ]
 * > // [3, "FOO"]
 * ```
 */
export interface Apply extends Kind.Kind {
  f(x: this[Kind._]): Apply_T<typeof x>
}

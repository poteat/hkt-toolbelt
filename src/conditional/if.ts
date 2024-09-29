import { $, Kind, Type } from '..'

/**
 * `_$if` is a type-level function that evaluates a predicate `Predicate` with
 * an input `X` of type `Kind._$inputOf<Predicate>`. If the predicate returns
 * `true`, then `_$if` will return the result of applying `Then` to `X`.
 * Otherwise, `_$if` will return the result of applying `Else` to `X`.
 *
 * This can be thought of as a type-level ternary operator.
 *
 * @template Predicate - A type-level function of the form `(x: never) => boolean`.
 * @template Then - A type-level function that is applied on the truthy branch.
 * @template Else - A type-level function that is applied on the falsy branch.
 * @template X - The input to the predicate function.
 */
export type _$if<
  Predicate extends Kind.Kind<(x: never) => boolean>,
  Then extends Kind.Kind,
  Else extends Kind.Kind,
  X extends Kind._$inputOf<Predicate>
> =
  $<Predicate, X> extends true
    ? $<Then, Type._$cast<X, Kind._$inputOf<Then>>>
    : $<Else, Type._$cast<X, Kind._$inputOf<Else>>>

interface If_T3<
  Predicate extends Kind.Kind<(x: never) => boolean>,
  Then extends Kind.Kind,
  Else extends Kind.Kind
> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind._$inputOf<Predicate>>
  ): _$if<Predicate, Then, Else, typeof x>
}

interface If_T2<
  Predicate extends Kind.Kind<(x: never) => boolean>,
  Then extends Kind.Kind
> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): If_T3<Predicate, Then, typeof x>
}

interface If_T1<Predicate extends Kind.Kind<(x: never) => boolean>>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): If_T2<Predicate, typeof x>
}

/**
 * `If` is a type-level if-then-else statement. Given a predicate `Predicate`,
 * a true branch `Then`, and a false branch `Else`, `If` will evaluate the
 * predicate with an input `X` of type `Kind._$inputOf<Predicate>`. If the
 * predicate returns `true`, then `If` will return the result of applying
 * `Then` to `X`. Otherwise, `If` will return the result of applying `Else`
 * to `X`.
 *
 * This can be thought of as a type-level ternary operator.
 *
 * @template {Kind} Predicate - A type-level function that returns a boolean.
 * @template {Kind} Then - A type-level function that is applied when the predicate returns
 * `true`.
 * @template {Kind} Else - A type-level function that is applied when the predicate returns
 * `false`.
 * @template {InputOf<Predicate>} X - The input to the predicate function.
 *
 * ## Usage Examples
 *
 * @example
 * For example, we can use `If` to create a type-level ternary operator. Since
 * `If` has a high arity, we use `$N` to pipe multiple arguments to `If`.
 *
 * Let's implement a function that emits 'yes' if the input string starts with
 * 'foo', and 'no' otherwise:
 *
 * ```ts
 * import { $, Conditional, Function } from "hkt-toolbelt";
 *
 * type StartsWithFoo = $N<
 *   Conditional.If,
 *   [
 *     $<String.StartsWith, "foo">,
 *     $<Function.Constant, "yes">,
 *     $<Function.Constant, "no">
 *   ]
 * >;
 *
 * type Result = StartsWithFoo<"foo">; // "yes"
 * ```
 *
 * In this example, we use `String.StartsWith` to create a predicate function
 * that returns `true` if the input string starts with "foo", and `false`
 * otherwise.
 *
 * Each of the truthy and falsy branches are simple constant functions that
 * return the string "yes" and "no", respectively. These functions are applied
 * on the input string, so more complex processing can be done in the branches.
 *
 * @example
 * We can also use `If` to filter a list. In this example, we use
 * `String.StartsWith` to filter out elements of a list that do not start with
 * the string "foo":
 *
 * ```ts
 * import { $, Conditional, List, String } from "hkt-toolbelt";
 *
 * type Filtered = $<
 *   $<
 *     List.Filter,
 *     $<Conditional.If, $<String.StartsWith, "foo">, String.Identity>
 *   >,
 *   ["foo", "bar", "baz", "foobar"]
 * >; // ["foo", "foobar"]
 * ```
 *
 * Here, we use `If` to create a conditional type-level function that returns
 * `String.Identity` when the string starts with "foo", and `never` otherwise.
 * We then pass this function to `List.Filter`, which returns a list of only the
 * elements that satisfy the predicate.
 */
export interface If extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: never) => boolean>>
  ): If_T1<typeof x>
}

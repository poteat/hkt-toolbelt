import { $, Type, Kind, Combinator } from '..'

/**
 * `ApplySelf` is a higher-order type-level function that takes in a recursive
 * kind and applies that kind to itself.
 *
 * This type-level function is provided only for theoretical completeness, and
 * experiences little practical use.
 *
 * This is similar to the `(f) => f(f)` pattern in functional programming,
 * where the function `f` takes in itself as an argument, and returns its own
 * application to itself.
 *
 * @param F A recursive kind that takes in itself as a type argument.
 *
 * @example
 * For example, we can use `ApplySelf` to create the omega combinator, which
 * is the simplest way to cause an infinite loop in term-rewriting systems.
 *
 * ```ts
 * import { Combinator } from "hkt-toolbelt";
 *
 * type Omega = $<Combinator.ApplySelf, Combinator.ApplySelf>; // Error
 * ```
 *
 * @example
 * For example, you could apply `ApplySelf` to the identity function. This
 * returns the identity function itself, so is of little practical use.
 *
 * ```ts
 * import { $, Combinator, Function } from "hkt-toolbelt";
 *
 * type Result = $<Combinator.ApplySelf, Function.Identity>; // Function.Identity
 * ```
 */
export interface ApplySelf extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Combinator.RecursiveKind>
  ): $<typeof x, Type._$cast<typeof x, Kind._$inputOf<typeof x>>>
}

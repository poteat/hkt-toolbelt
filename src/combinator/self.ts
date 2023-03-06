import { Kind } from "..";

/**
 * `Self` is a higher-order type-level function that outputs itself. Since it
 * outputs itself, it can be applied an arbitrary amount of times.
 *
 * ## Example
 *
 * ```ts
 * import { $, Combinator } from "hkt-toolbelt";
 *
 * type Self1 = $<Combinator.Self, never>;
 *
 * type Self2 = $<Self1, never>;
 * ```
 */
export interface Self extends Kind.Kind {
  f(x: this[Kind._]): Self;
}

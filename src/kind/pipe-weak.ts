import { Kind, List, Type } from '..'

/**
 * `PipeWeak` is a type-level function that takes a tuple of type-level
 * functions and composes them from left to right, such that the output of the
 * first function is the input of the second function, and so on.
 *
 * This is a weaker version of `Pipe` that does not enforce subtype
 * constraints between the input and output of each function.
 *
 * The type constraint associated with the overall input, and the constraint
 * enforcing a tuple of kinds are both still enforced.
 *
 * This is useful for pipes which are too complicated for the inputs and outputs
 * to be correctly inferred.
 *
 * @template FX - A tuple of type-level functions that will be piped together.
 * @template X - The type that the type-level functions will be applied to.
 *
 * @example
 *
 * ```ts
 * import { $, Kind, String } from "hkt-toolbelt";
 *
 * type MyFunc = $<Kind.PipeWeak, [
 *   $<String.Append, "foo">,
 *   $<String.Append, "bar">,
 * ]>
 *
 * type Result = $<MyFunc, "baz"> // "bazfoobar"
 * ```
 */
export type _$pipeWeak<FX extends Kind.Kind[], X> = Kind._$pipe<FX, X>

interface PipeWeak_T<FX extends Kind.Kind[]> extends Kind.Kind {
  f(
    x: Type._$cast<
      this[Kind._],
      FX extends [] ? unknown : Kind._$inputOf<List._$first<FX>>
    >
  ): _$pipeWeak<FX, typeof x>
}

/**
 * `PipeWeak` is a type-level function that takes a tuple of type-level
 * functions and composes them from left to right, such that the output of the
 * first function is the input of the second function, and so on.
 *
 * This is a weaker version of `Pipe` that does not enforce subtype
 * constraints between the input and output of each function.
 *
 * The type constraint associated with the overall input, and the constraint
 * enforcing a tuple of kinds are both still enforced.
 *
 * This is useful for pipes which are too complicated for the inputs and outputs
 * to be correctly inferred.
 *
 * @template FX - A tuple of type-level functions that will be piped together.
 * @template X - The type that the type-level functions will be applied to.
 *
 * @example
 *
 * ```ts
 * import { $, Kind, String } from "hkt-toolbelt";
 *
 * type MyFunc = $<Kind.PipeWeak, [
 *   $<String.Append, "foo">,
 *   $<String.Append, "bar">,
 * ]>
 *
 * type Result = $<MyFunc, "baz"> // "bazfoobar"
 * ```
 */
export interface PipeWeak extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind[]>): PipeWeak_T<typeof x>
}

import { $, Kind, Type } from ".."

/**
 * `_$unapply` is a type-level function that takes in 
 * a) a type-level function that has been partially or fully applied,
 * b) the type-level function that was applied to an argument to produce the first input type,
 * and then extracts and returns that very argument. 
 *
 * @param K The target type-level function to unapply.
 * @param F The type-level function that was applied to an argument to derive `K`
 *
 * This is useful for determining what argument was passed into a known type-level function
 * to derive a given applied type-level function.
 * 
 * example
 *
 * For example, we can use `_$unapply` to determine what argument was passed into an applied type-level function.
 * In this example, we pass in `Add2`, the target function, and `NaturalNumber.Add` into `_$unapply`, 
 * which gives us the input that was passed into `NaturalNumber.Add` to derive `Add2`.
 *
 * ```ts
 * import { $, Kind, NaturalNumber } from "hkt-toolbelt";
 *
 * type Add2 = $<NaturalNumber.Add, 2>
 * type Is2 = Kind._$unapply<Add2, NaturalNumber.Add> // 2
 * ```
 */
export type _$unapply<
  K extends Kind.Kind,
  F extends Kind.Kind,
> = K extends $<F, infer X>
    ? X
    : never

interface Unapply_T<F extends Kind.Kind> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind>
  ): _$unapply<typeof x, F>
}

/**
 * `Unapply` is a type-level function that takes in 
 * a) a type-level function that has been partially or fully applied,
 * b) the type-level function that was applied to an argument to produce the first input type,
 * and then extracts and returns that very argument. 
 *
 * @param K The target type-level function to unapply.
 * @param F The type-level function that was applied to an argument to produce `K`
 * 
 * This is useful for determining what argument was passed into a known type-level function
 * to derive a given applied type-level function.
 *
 * @example
 *
 * For example, we can use `Unapply` to determine what argument was passed into an applied type-level function.
 * In this example, we partially apply `Unapply` to `NaturalNumber.Add`, which results in a
 * type-level function that returns the argument passed into `NaturalNumber.Add` to derive its input, 
 * if its input is the result of applying that function.
 *  
 * We then apply this partially applied function to `Add2` using the `$` type-levl applicator:

 * ```ts
 * import { $, Kind, NaturalNumber } from "hkt-toolbelt";
 *
 * type Add2 = $<NaturalNumber.Add, 2>
 * type Is2 = $<$<Kind.Unapply, NaturalNumber.Add>, Add2> // 2
 * ```
 */
export interface Unapply extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): Unapply_T<typeof x>;
}

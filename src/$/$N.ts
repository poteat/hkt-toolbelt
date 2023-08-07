import { Kind } from ".."

/**
 * `$N` is a type-level function that applies a type-level function to a list of
 * arguments.
 *
 * This is syntactic sugar for nested `$` applications. In some sense this is
 * the contrapositive of `$$`, in that `$$` pipes a value through a list of
 * functions, while `$N` pipes a list of values through a function.
 *
 * @param K The type-level function to apply.
 * @param X The list of arguments to apply the type-level function to.
 *
 * Since all type-level functions are curried, we successively apply the
 * type-level function to each argument in the list.
 *
 * This is useful for applying a type-level function that takes many arguments,
 * such as conditionals.
 *
 * @example
 * For example, `Function.If` is a type-level function which takes in four
 * arguments: a predicate, a truthy branch, a falsy branch, and an input type.
 *
 * Let's consider a function that emits 'even' if the input number is even, and
 * 'odd' if the input number is odd:
 *
 * ```ts
 * import { $, $N, Conditional, Function, NaturalNumber } from "hkt-toolbelt";
 *
 * type Parity = $N<
 *   Conditional.If,
 *   [
 *     NaturalNumber.IsEven,
 *     $<Function.Constant, "even">,
 *     $<Function.Constant, "odd">
 *   ]
 * >;
 *
 * type Result = $<Parity, 42>; // "even"
 * ```
 *
 * Here, we apply `Conditional.If` to a list of arguments. The first argument is
 * `NaturalNumber.IsEven`, which is a type-level function that takes in a
 * `NaturalNumber` and returns `true` if the number is even, and `false`
 * otherwise. The second argument is a type-level function that always returns
 * the string "even". The third argument is a type-level function that always
 * returns the string "odd".
 *
 * Since all type-level functions are curried, the resultant `Parity` type-level
 * function may be applied to get the result.
 */
export type $N<K extends Kind.Kind, X extends unknown[]> = Kind._$uncurry<K, X>

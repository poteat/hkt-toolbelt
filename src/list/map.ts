import { $, Type, Kind } from '..'

/**
 * `_$map` is a type-level function that takes in two inputs:
 * a partially-applied type-level function that expects one more argument,
 * and a target list of types upon which to perform the map operation.
 * It returns a mapped list of types.
 *
 * The type-level function input must be a unary, curried `Kind` type as defined in this library.
 * @see {@link https://github.com/poteat/hkt-toolbelt/blob/main/docs/guides/custom-kinds.md} for details on how to create a custom kind.
 *
 * @param F A type-level function that transforms a unary input and returns the result.
 * @param X A list of types. The target of the map operation.
 *
 * @example
 * For example, we can use `_$map` to extract the same property from a list of objects.
 *
 * ```ts
 * import { List, Object } from "hkt-toolbelt";
 *
 * type GetCities = List._$map<$<
 *   Object.At, "city">,
 *   [{ city: "Los Angeles", country: "USA" }, { city: "Seoul", country: "Korea" }, { city: "Paris", country: "France" }]
 * >;  // ["Los Angeles", "Seoul", "Paris"]
 * ```
 */
export type _$map<T extends Kind.Kind, X extends unknown[]> = {
  [key in keyof X]: $<T, Type._$cast<X[key], Kind._$inputOf<T>>>
}

interface Map_T<T extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$map<T, typeof x>
}

/**
 * `Map` is a type-level function that takes in two inputs:
 * a partially-applied type-level function that expects one more argument,
 * and a target list of types upon which to perform the map operation.
 * It returns a mapped list of types.
 *
 * The type-level function input must be a unary, curried `Kind` type as defined in this library.
 * @see {@link https://github.com/poteat/hkt-toolbelt/blob/main/docs/guides/custom-kinds.md} for details on how to create a custom kind.
 *
 * @param F A type-level function that transforms a unary input and returns the result.
 * @param X A list of types. The target of the map operation.
 *
 * @example
 * For example, we can use `Map` to extract the same property from a list of objects.
 *
 * ```ts
 * import { $, List, Object } from "hkt-toolbelt";
 *
 * type GetCities = $<$<List.Map, $<Object.At, "city">>, [
 *   { city: "Los Angeles", country: "USA" },
 *   { city: "Seoul", country: "Korea" },
 *   { city: "Paris", country: "France" }
 * ]>;  // ["Los Angeles", "Seoul", "Paris"]
 *
 * @example
 * We can also use the `$N` applicator to invoke `Map` with a list containing the required arguments
 * This improves readability by allowing us to avoid nesting `$` calls.
 *
 * ```ts
 * import { $N, List, Object } from "hkt-toolbelt";
 *
 * type GetCities = $N<List.Map, [
 *   $<Object.At, "city">,
 *   [
 *     { city: "Los Angeles", country: "USA" },
 *     { city: "Seoul", country: "Korea" },
 *     { city: "Paris", country: "France" }
 *   ]
 * ]>;  // ["Los Angeles", "Seoul", "Paris"]
 * ```
 *
 * @example
 * By partially applying only the first argument to `Map`,
 * we can define a type-level function that can apply the same operation to multiple list inputs.
 *
 * ```ts
 * import { $, List, NaturalNumber } from hkt-toolbelt;
 *
 * type MultiplyByTwo = $<List.Map, $<NaturalNumber.Multiply, 2>>;
 * type EvenNums = $<MultiplyByTwo, [1, 2, 3, 4, 5]>;  // [2, 4, 6, 8, 10]
 * type AllZero = $<MultiplyByTwo, [0, 10, 20, 30, 40]>;  // [0, 20, 40, 60, 80]
 * ```
 *
 * @example
 * Another use case for a partially-applied `Map` function is to implement
 * sophisticated higher-order functionality by passing it into other type-level functions.
 *
 * ```ts
 * import { $, $$, $N, Kind, List, Object, Conditional, String } from "hkt-toolbelt";
 *
 * type BooleanToBinary = $<Kind.Pipe, [
 *   $<List.Map,
 *     $N<Conditional.If, [
 *       $<Conditional.Extends, true>,
 *       $<Function.Constant, "1">,
 *       $<Function.Constant, "0">,
 *     ]>
 *   >,
 *   DigitList.ToString,
 *   $<String.Prepend, "0b">
 * ]>
 *
 * type MapBooleanToBinary = $N<List.Map, [
 *   BooleanToBinary,
 *   [
 *     [true, true, true, true, false],
 *     [true, false, true, false, true],
 *   ]
 * ]>  // ["0b11110", "0b10101"]
 * ```
 */
export interface Map extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): Map_T<typeof x>
}

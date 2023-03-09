import { Type, Number, Kind, DigitList, NaturalNumber } from "..";

/**
 * `Modulo` is a type-level function that takes in two natural number types,
 * `A` and `B`, and returns the remainder of `B` divided by `A`.
 * 
 * ## Parameters
 * 
 * @param A The number to divide by.
 * @param B The number to divide.
 * 
 * The parameters are ordered such that `Modulo` can be partially applied in a
 * coherent manner. That is, we can apply `Modulo` to `3`, and have a function
 * `ModuloThree`.
 */
export type _$modulo<
  A extends Number.Number,
  B extends Number.Number,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<A>,
  B_LIST extends DigitList.DigitList = NaturalNumber._$toList<B>,
  MODULUS_LIST extends DigitList.DigitList = DigitList._$modulo<B_LIST, A_LIST>,
  MODULUS = DigitList._$toNumber<MODULUS_LIST>
> = MODULUS;

interface Modulo_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? _$modulo<A, typeof x> : never;
}

/**
 * `Modulo` is a type-level function that takes in two natural number types,
 * `A` and `B`, and returns the remainder of `B` divided by `A`.
 * 
 * ## Parameters
 * 
 * @param A The number to divide by.
 * @param B The number to divide.
 * 
 * The parameters are ordered such that `Modulo` can be partially applied in a
 * coherent manner. That is, we can apply `Modulo` to `3`, and have a function
 * `ModuloThree`.
 * 
 * ## Usage Examples
 * 
 * @example
 * 
 * For example, we can use `Modulo` to determine the remainder of a natural
 * number divided by another natural number. In this example, `3` and `2` are
 * passed as type arguments to the type-level function:
 * 
 * We apply `Modulo` to `3`, and then to `2` respectively using the `$`
 * type-level applicator:
 * 
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 * 
 * type Result = $<$<NaturalNumber.Modulo, 3>, 2>; // 2
 * ```
 * 
 * @example
 * 
 * Here we calculate the remainder of `10` divided by `3`:
 * 
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 * 
 * type Result = $<$<NaturalNumber.Modulo, 3>, 10>; // 1
 * ```
 */
export interface Modulo extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? Modulo_T<typeof x> : never;
}

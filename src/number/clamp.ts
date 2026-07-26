import { Kind, Type, Number } from '..'

/**
 * `_$clamp` is a type-level function that constrains a number to a range,
 * returning the nearest bound when the number falls outside it.
 *
 * @template LO - The lower bound.
 * @template HI - The upper bound.
 * @template X - The number to clamp.
 *
 * @example
 * type T0 = _$clamp<0, 10, 15> // 10
 * type T1 = _$clamp<0, 10, 7> // 7
 */
export type _$clamp<
  LO extends Number.Number,
  HI extends Number.Number,
  X extends Number.Number
> = Number._$min<HI, Number._$max<LO, X>>

interface Clamp_T2<LO extends Number.Number, HI extends Number.Number>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$clamp<LO, HI, typeof x>
}

interface Clamp_T1<LO extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Clamp_T2<LO, typeof x>
}

/**
 * `Number.Clamp` is a type-level function that constrains a number to a range,
 * returning the nearest bound when the number falls outside it.
 *
 * @template LO - The lower bound.
 * @template HI - The upper bound.
 * @template X - The number to clamp.
 *
 * @example
 * type T0 = $<$<$<Number.Clamp, 0>, 10>, 15> // 10
 * type T1 = $<$<$<Number.Clamp, 0>, 10>, 7> // 7
 */
export interface Clamp extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Clamp_T1<typeof x>
}

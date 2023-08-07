import { Kind, Type } from '..';

export type _$deepInputOf<F extends Kind.Kind> =
  | Kind._$inputOf<F>
  | { [key: string]: _$deepInputOf<F> };

interface DeepInputOf_T<F extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind._$inputOf<F>>): _$deepInputOf<F>;
}

/**
 * Given a higher-kinded type `K`, returns a union of either the input of `K`,
 * or a recursive object whose values are exclusively the input of `K`.
 *
 * @example
 * $<Object.DeepInputOf, Number.IsInteger>>
 * // number | { [key: string]: number | { [key: string]: number | { ... } } }
 */
export interface DeepInputOf extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): DeepInputOf_T<typeof x>;
}

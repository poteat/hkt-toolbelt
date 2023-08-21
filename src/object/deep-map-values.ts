import { $, Kind, Type, Object } from '..'

/**
 * `Object._$deepMapValues` is a type-level function that deeply maps over the values in an object.
 * 
 * @template F - The function to apply to each value.
 * @template O - The object to map over.
 */
export type _$deepMapValues<F extends Kind.Kind, O> = {
  [key in keyof O]: Type._$display<
    O[key] extends Record<string, unknown>
      ? _$deepMapValues<F, O[key]>
      : $<F, Type._$cast<O[key], Kind._$inputOf<F>>>
  >
}

/**
 * `Object.DeepMapValues_T` is an intermediate interface for currying.
 * 
 * @template T - The function to apply to each value.
 */
interface DeepMapValues_T<T extends Kind.Kind> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Object._$deepInputOf<T>>
  ): _$deepMapValues<T, typeof x>
}

/**
 * `Object.DeepMapValues` is a type-level function that deeply maps over the values in an object.
 * 
 * @template T - The function to apply to each value.
 */
export interface DeepMapValues extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): DeepMapValues_T<typeof x>
}

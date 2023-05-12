import { $, Type, Kind } from '..'

export type _$concatBy<U extends unknown[], T extends unknown[]> = [...U, ...T]

interface ConcatBy_T<U extends unknown[]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$concatBy<U, typeof x>
}

export interface ConcatBy extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): ConcatBy_T<typeof x>
}

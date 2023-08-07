import { Kind } from '..'

export type _$isString<S extends unknown> = S extends string ? true : false

export interface IsString extends Kind.Kind {
  f(x: this[Kind._]): _$isString<typeof x>
}

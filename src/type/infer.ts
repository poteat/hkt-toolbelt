import { Kind, Function } from 'hkt-toolbelt'

type _$inferred = string | number | bigint | boolean | Kind.Kind

export type _$infer<X> =
  | (X extends [] ? [] : never)
  | (X extends _$inferred ? X : never)
  | { [K in keyof X]: X[K] extends Function.Function ? X[K] : _$infer<X[K]> }

export interface Infer extends Kind.Kind {
  f(x: this[Kind._]): _$infer<typeof x>
}

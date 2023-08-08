import { Kind } from '..'

export interface Identity extends Kind.Kind {
  f(x: this[Kind._]): typeof x
}

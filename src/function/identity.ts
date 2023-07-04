import { Kind } from '..'

export interface Identity extends Kind.Kind {
  f(x: this[Kind._]): typeof x
}

export declare const identity: Kind._$reify<Identity>

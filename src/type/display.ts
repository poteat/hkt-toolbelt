import { Kind } from '..'

export type _$display<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends abstract new (...args: never[]) => unknown
  ? T
  : {
      [key in keyof T]: T[key]
    }

export interface Display extends Kind.Kind {
  f(x: this[Kind._]): _$display<this[Kind._]>
}

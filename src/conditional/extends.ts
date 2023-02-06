import { Kind } from "..";

export type _$extends<T, X> = (X extends unknown ? X : never) extends T
  ? true
  : false;

interface Extends_T<T> extends Kind.Kind {
  f(x: this[Kind._]): _$extends<T, typeof x>;
}

export interface Extends extends Kind.Kind {
  f(x: this[Kind._]): Extends_T<typeof x>;
}

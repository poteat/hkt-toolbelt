import { Kind } from "..";

export type _$extends<Super, X> = (X extends unknown ? X : never) extends Super
  ? true
  : false;

interface Extends_Super<Super> extends Kind.Kind {
  f(x: this[Kind._]): _$extends<Super, typeof x>;
}

export interface Extends extends Kind.Kind {
  f(x: this[Kind._]): Extends_Super<typeof x>;
}

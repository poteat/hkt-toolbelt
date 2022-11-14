import { Kind } from "..";

export type _$extends<Super, X> = (X extends unknown ? X : never) extends Super
  ? true
  : false;

export abstract class Extends<Super> extends Kind.Kind {
  abstract f: (x: this[Kind._]) => _$extends<Super, typeof x>;
}

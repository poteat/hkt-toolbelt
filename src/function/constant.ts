import { Kind } from "..";

export abstract class Constant<X> extends Kind.Kind {
  abstract f: (x: this[Kind._]) => X;
}

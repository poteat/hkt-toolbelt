import { Kind } from "..";

interface Constant_T<X> extends Kind.Kind {
  f(x: this[Kind._]): X;
}

export interface Constant extends Kind.Kind {
  f(x: this[Kind._]): Constant_T<typeof x>;
}

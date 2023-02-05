import { Kind } from "..";

export interface Self extends Kind.Kind {
  f(x: this[Kind._]): Self;
}

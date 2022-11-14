import { Kind } from "..";

export abstract class Identity extends Kind.Kind {
  abstract f: (x: this[Kind._]) => typeof x;
}

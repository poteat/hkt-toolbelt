import { Kind } from "..";

export abstract class Self extends Kind.Kind {
  abstract f: (x: this[Kind._]) => Self;
}

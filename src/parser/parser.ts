import { Kind, Type } from "..";

export declare abstract class Parser extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], string>) => unknown;
}

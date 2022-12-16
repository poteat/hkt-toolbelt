import { Kind, Type, Parser as _Parser } from "..";

export declare abstract class Parser extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], _Parser._$state>
  ) => _Parser._$state;
}

import { Kind, Type, Parser as _Parser } from '..';

export interface Parser extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], _Parser._$state>): _Parser._$state;
}

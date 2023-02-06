import { Kind, Type } from "..";

export type _$deepInputOf<F extends Kind.Kind> =
  | Kind._$inputOf<F>
  | { [key: string]: _$deepInputOf<F> };

export interface DeepInputOf<F extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind._$inputOf<F>>): _$deepInputOf<F>;
}

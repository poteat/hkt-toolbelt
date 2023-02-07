import { Kind, Type, Number } from "..";

export type _$toString<N extends Number.Number> = `${N}`;

export interface ToString extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$toString<typeof x>;
}

import { Kind, Type, Number } from "..";

export type _$toString<N extends Number.Number> = `${N}`;

export declare abstract class ToString extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Number.Number>
  ) => _$toString<typeof x>;
}

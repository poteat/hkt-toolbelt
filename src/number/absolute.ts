import { Number, Type, Kind } from "..";

export type _$absolute<T extends Number.Number> = `${T}` extends `-${infer U extends number}` ? U : T

export interface Absolute extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$absolute<typeof x>;
}

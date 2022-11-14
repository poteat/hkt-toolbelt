import { Kind, Type } from "..";
import { _$keys } from "./keys";

export type _$values<T extends Record<string, unknown>, Keys = _$keys<T>> = {
  [key in keyof Keys]: T[Type._$cast<Keys[key], keyof T>];
};

export abstract class Values extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Record<string, unknown>>
  ) => _$values<typeof x>;
}

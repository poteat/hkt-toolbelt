import { Kind, Type } from "..";

export type _$at<K extends keyof T, T extends Record<string, unknown>> = T[K];

export interface At<K extends string | symbol> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Record<K, unknown>>): _$at<K, typeof x>;
}

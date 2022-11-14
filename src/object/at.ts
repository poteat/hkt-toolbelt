import { Kind, Type } from "..";

export type _$at<K extends keyof T, T extends Record<string, unknown>> = T[K];

export abstract class At<K extends string | symbol> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Record<K, unknown>>
  ) => _$at<K, typeof x>;
}

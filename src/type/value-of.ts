import { Kind } from "..";

export type _$valueOf<T> = T extends unknown[] ? T[number] : T[keyof T];

export interface ValueOf extends Kind.Kind {
  f(x: this[Kind._]): _$valueOf<typeof x>;
}

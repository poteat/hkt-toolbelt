import { Kind } from "..";

export type _$cast<T, U> = T extends U ? T : U;

export interface Cast<T> extends Kind.Kind {
  f(x: this[Kind._]): _$cast<typeof x, T>;
}

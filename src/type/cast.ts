import { Kind } from "..";

export type _$cast<T, U> = T extends U ? T : U;

interface Cast_T<T> extends Kind.Kind {
  f(x: this[Kind._]): _$cast<typeof x, T>;
}

export interface Cast extends Kind.Kind {
  f(x: this[Kind._]): Cast_T<typeof x>;
}

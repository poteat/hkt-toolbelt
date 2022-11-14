import { Kind } from "..";

export type _$cast<T, U> = T extends U ? T : U;

export abstract class Cast<T> extends Kind.Kind {
  abstract f: (x: this[Kind._]) => _$cast<typeof x, T>;
}

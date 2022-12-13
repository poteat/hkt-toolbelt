import { Kind } from "..";

export type _$notEquals<T, U> = [T, U] extends [U, T] ? false : true;

export abstract class NotEquals<T> extends Kind.Kind {
  abstract f: (x: this[Kind._]) => _$notEquals<T, typeof x>;
}

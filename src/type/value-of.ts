import { Kind } from "..";

export type _$valueOf<T> = T extends unknown[] ? T[number] : T[keyof T];

export declare abstract class ValueOf extends Kind.Kind {
  abstract f: (x: this[Kind._]) => _$valueOf<typeof x>;
}

import { Kind } from "..";

export type _$toIntersection2<T> = (
  T extends unknown ? (x: T) => unknown : never
) extends (x: infer X) => void
  ? X
  : never;

export type _$toIntersection<T> = boolean extends T
  ? boolean & _$toIntersection2<Exclude<T, boolean>>
  : _$toIntersection2<T>;

export declare abstract class ToIntersection extends Kind.Kind {
  abstract f: (x: this[Kind._]) => _$toIntersection<this[Kind._]>;
}

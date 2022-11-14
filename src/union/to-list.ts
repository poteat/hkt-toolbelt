import { Kind } from "..";
import { _$toIntersection } from "./to-intersection";

export type _$toList<T, O extends unknown[] = []> = _$toIntersection<
  T extends unknown ? (t: T) => T : never
> extends (x: never) => infer X
  ? _$toList<Exclude<T, X>, [X, ...O]>
  : O;

export declare abstract class ToList extends Kind.Kind {
  abstract f: (x: this[Kind._]) => _$toList<this[Kind._]>;
}

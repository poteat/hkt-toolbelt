import { Type, Kind } from '..';

export type _$fromList<T, O extends string = ''> = 0 extends 1
  ? never
  : T extends [infer Head, ...infer Tail]
  ? _$fromList<Tail, `${O}${Type._$cast<Head, string>}`>
  : O;

export interface FromList extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string[]>): _$fromList<typeof x>;
}

import { Type, Kind } from '..';

export type _$reverse<
  S extends string,
  O extends string = ''
> = S extends `${infer Head}${infer Tail}`
  ? _$reverse<Tail, `${Head}${O}`>
  : `${string extends S ? string : ''}${O}`;

export interface Reverse extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$reverse<typeof x>;
}

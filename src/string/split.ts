import { Type, Kind } from "..";
import { _$isTemplate } from "./is-template";

export type _$split<
  S extends string,
  Delimiter extends string = "",
  O extends unknown[] = []
> = _$isTemplate<Delimiter> extends true
  ? string[]
  : string extends Delimiter
  ? string[]
  : S extends `${infer Head}${Delimiter}${infer Tail}`
  ? _$split<Tail, Delimiter, [...O, Head]>
  : S extends Delimiter
  ? O
  : [...O, S];

export abstract class Split<Delimiter extends string = ""> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], string>
  ) => _$split<typeof x, Delimiter>;
}

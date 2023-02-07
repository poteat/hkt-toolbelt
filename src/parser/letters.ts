import { Type, Kind, Parser, String, NaturalNumber, Number } from "..";

export type _$letters2<
  S extends string,
  MATCH extends string = ""
> = 0 extends 1
  ? never
  : S extends `${infer Head}${infer Tail}`
  ? Head extends Parser.__$letter
    ? _$letters2<Tail, `${MATCH}${Head}`>
    : MATCH
  : MATCH;

export type _$letters<
  STATE extends Parser._$state,
  SLICED_INPUT extends string = String._$slice<STATE["input"], STATE["index"]>,
  MATCH extends string = _$letters2<SLICED_INPUT>,
  NEW_INDEX extends Number.Number = NaturalNumber._$add<
    STATE["index"],
    String._$length<MATCH>
  >,
  NEW_STATE extends Parser._$state = MATCH extends ""
    ? never
    : {
        input: STATE["input"];
        index: NEW_INDEX;
        result: MATCH;
      }
> = NEW_STATE;

export interface Letters extends Parser.Parser {
  f(x: Type._$cast<this[Kind._], Parser._$state>): _$letters<typeof x>;
}

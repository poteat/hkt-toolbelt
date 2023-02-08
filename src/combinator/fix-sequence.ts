import { $, Type, Kind } from "..";

export type _$fixSequence<
  KIND extends Kind.Kind,
  VALUE extends Kind._$inputOf<KIND>,
  STATE extends unknown[] = [VALUE],
  NEXT_VALUE = $<KIND, VALUE>,
  NEXT_STATE extends unknown[] = [...STATE, NEXT_VALUE],
  DONE extends boolean = NEXT_VALUE extends VALUE ? true : false
> = DONE extends true
  ? STATE
  : _$fixSequence<
      DONE extends false ? KIND : never,
      Type._$cast<NEXT_VALUE, Kind._$inputOf<KIND>>,
      NEXT_STATE
    >;

export interface FixSequence_T<KIND extends Kind.Kind> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind._$inputOf<KIND>>
  ): _$fixSequence<KIND, typeof x>;
}

export interface FixSequence extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind>
  ): FixSequence_T<Type._$cast<this[Kind._], Kind.Kind>>;
}

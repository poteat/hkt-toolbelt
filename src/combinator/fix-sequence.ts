import { $, Type, Kind } from "..";

export type _$fixSequence<
  KIND extends Kind.Kind,
  INITIAL extends Kind._$inputOf<KIND>,
  VALUE extends Kind._$inputOf<KIND> = INITIAL,
  STATE extends unknown[] = [INITIAL],
  NEXT_VALUE = $<KIND, VALUE>,
  NEXT_STATE extends unknown[] = [...STATE, NEXT_VALUE],
  DONE extends boolean = NEXT_VALUE extends VALUE ? true : false
> = DONE extends true
  ? STATE
  : _$fixSequence<
      KIND,
      INITIAL,
      Type._$cast<NEXT_VALUE, Kind._$inputOf<KIND>>,
      NEXT_STATE
    >;

declare abstract class FixSequence_T<KIND extends Kind.Kind> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Kind._$inputOf<KIND>>
  ) => _$fixSequence<KIND, typeof x>;
}

export declare abstract class FixSequence extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Kind.Kind>
  ) => FixSequence_T<Type._$cast<this[Kind._], Kind.Kind>>;
}

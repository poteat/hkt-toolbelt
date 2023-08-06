import { $, Kind, Type, Number, List, NaturalNumber, Conditional } from "..";

type _$range2<
  START extends Number.Number,
  STOP extends Number.Number,
  STEP extends Number.Number,
  IS_REVERSE extends boolean = Number._$compare<STEP, 0> extends -1
    ? true
    : false,
  STEP_ABS extends Number.Number = Number._$isInteger<STEP> extends true
    ? Number._$absolute<STEP>
    : never,
  F extends Kind.Kind<(x: never) => Kind.Kind> = IS_REVERSE extends true
    ? $<NaturalNumber.SubtractBy, STEP_ABS>
    : $<NaturalNumber.Add, STEP_ABS>,
  DISTANCE extends Number.Number = NaturalNumber._$subtract<
    Number._$max<START, STOP>,
    Number._$min<START, STOP>
  >,
  COUNT extends Number.Number = NaturalNumber._$divide<DISTANCE, STEP_ABS>,
  VALIDATE extends boolean = IS_REVERSE extends true
    ? NaturalNumber._$compare<START, STOP> extends 1 | 0
      ? true
      : false
    : NaturalNumber._$compare<START, STOP> extends -1 | 0
    ? true
    : false,
  RESULT extends Number.Number[] = START extends Kind._$inputOf<F>
    ? List._$iterate<F, START, COUNT>
    : never
> = 0 extends 1
  ? never
  : VALIDATE extends true
  ? COUNT extends 0
    ? []
    : RESULT
  : never;

export type _$range<
  START extends Number.Number,
  STOP extends Number.Number,
  STEP extends Number.Number
> = List._$every<
  $<Conditional.Extends, true>,
  [
    Number._$isNatural<START>,
    Number._$isNatural<STOP>,
    Number._$isInteger<STEP>
  ]
> extends true
  ? _$range2<START, STOP, STEP>
  : never;

interface Range_T2<START extends Number.Number, STOP extends Number.Number>
  extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): _$range<START, STOP, typeof x>;
}

interface Range_T<START extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Range_T2<START, typeof x>;
}

export interface Range extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Range_T<typeof x>;
}

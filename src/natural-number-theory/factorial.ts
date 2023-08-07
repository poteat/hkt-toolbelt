import { Kind, Type, Number, NaturalNumber } from '..';

export type _$factorial<
  COUNTER extends Number.Number,
  VALUE extends Number.Number = 1,
  DONE extends boolean = COUNTER extends 0 ? true : false
> = 0 extends 1
  ? never
  : DONE extends true
  ? VALUE
  : _$factorial<
      NaturalNumber._$decrement<COUNTER>,
      NaturalNumber._$multiply<VALUE, COUNTER>
    >;

export interface Factorial extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$factorial<typeof x>;
}

import { $, Digit, Kind, Type } from '../'

type _$compare_LUT = [
  [0, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
  [1,  0, -1, -1, -1, -1, -1, -1, -1, -1], 
  [1,  1,  0, -1, -1, -1, -1, -1, -1, -1], 
  [1,  1,  1,  0, -1, -1, -1, -1, -1, -1], 
  [1,  1,  1,  1,  0, -1, -1, -1, -1, -1], 
  [1,  1,  1,  1,  1,  0, -1, -1, -1, -1], 
  [1,  1,  1,  1,  1,  1,  0, -1, -1, -1], 
  [1,  1,  1,  1,  1,  1,  1,  0, -1, -1], 
  [1,  1,  1,  1,  1,  1,  1,  1,  0, -1], 
  [1,  1,  1,  1,  1,  1,  1,  1,  1,  0],
];

export type _$compare<
  A extends Digit.Digit,
  B extends Digit.Digit,
  RESULT extends 1 | 0 | -1 = _$compare_LUT[A][B]
> = RESULT;

interface Compare_T<A extends Digit.Digit> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): _$compare<A, typeof x>;
}

export interface Compare extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): Compare_T<typeof x>;
}

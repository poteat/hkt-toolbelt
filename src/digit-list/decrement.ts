import { Type, Kind, Digit, DigitList } from "..";

type _$decrement2<
  A extends DigitList.DigitList,
  CARRY extends Digit.Digit = "1",
  OUTPUT extends DigitList.DigitList = [],
  A_LAST extends Digit.Digit = DigitList._$last<A>,
  A_POP extends DigitList.DigitList = DigitList._$pop<A>,
  NEXT_A extends DigitList.DigitList = A_POP extends "0"[] ? [] : A_POP,
  DECREMENT extends Digit.Digit = CARRY extends "1"
    ? Digit._$decrement<A_LAST>
    : A_LAST,
  NEXT_CARRY extends Digit.Digit = CARRY extends "1"
    ? Digit._$decrementTens<A_LAST>
    : "0",
  NEXT_OUTPUT extends DigitList.DigitList = [DECREMENT, ...OUTPUT],
  FINAL_RESULT = CARRY extends "1" ? ["0"] : OUTPUT,
  SHORT_CIRCUIT = A extends "0"[] ? OUTPUT : [...A, ...OUTPUT]
> = A extends "0"[]
  ? FINAL_RESULT
  : CARRY extends "0"
  ? SHORT_CIRCUIT
  : _$decrement2<NEXT_A, NEXT_CARRY, NEXT_OUTPUT>;

export type _$decrement<A extends DigitList.DigitList> = DigitList._$trim<
  A extends "0"[] ? ["0"] : _$decrement2<A>
>;

export interface Decrement extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$decrement<typeof x>;
}

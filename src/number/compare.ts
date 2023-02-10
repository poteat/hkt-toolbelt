import { Type, Number, Kind, DigitList, List, NaturalNumber, Conditional } from "..";

export type _$compare2<
  A extends Number.Number,
  B extends Number.Number,
  A_SGN extends "+" | "-" = Number._$sign<A>,
  B_SGN extends "+" | "-" = Number._$sign<B>,
  A_ABS extends Number.Number = Number._$absolute<A>,
  B_ABS extends Number.Number = Number._$absolute<B>,
  A_INT extends DigitList.DigitList = `${A_ABS}` extends `${infer INT extends Number.Number}.${string}` 
    ? NaturalNumber._$toList<INT>
    : NaturalNumber._$toList<A_ABS>,
  B_INT extends DigitList.DigitList = `${B_ABS}` extends `${infer INT extends Number.Number}.${string}` 
    ? NaturalNumber._$toList<INT>
    : NaturalNumber._$toList<B_ABS>,
  A_FRAC extends DigitList.DigitList = `${A}` extends `${string}.${infer FRAC extends string}` 
    ? DigitList._$fromString2<FRAC>
    : ["0"],
  B_FRAC extends DigitList.DigitList = `${B}` extends `${string}.${infer FRAC extends string}` 
    ? DigitList._$fromString2<FRAC>
    : ["0"],
  RESULT = A_SGN extends B_SGN
    ? A_INT extends B_INT
      ? _$fracCompare<A_FRAC, B_FRAC>
      : A_SGN extends "+" 
        ? DigitList._$compare<A_INT, B_INT>
        : DigitList._$compare<B_INT, A_INT>
    : A_SGN extends "+" ? 1 : -1
> = RESULT;

export type _$fracCompare<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList,
  A_LENGTH extends Number.Number = A["length"],
  B_LENGTH extends Number.Number = B["length"],
  LENGTH_COMP extends 1 | 0 | -1 = NaturalNumber._$compare<A_LENGTH, B_LENGTH>,
  SHORT extends DigitList.DigitList = LENGTH_COMP extends 1 ? B : LENGTH_COMP extends -1 ? A : A,
  LONG extends DigitList.DigitList = LENGTH_COMP extends 1 ? A : LENGTH_COMP extends -1 ? B : B,
  LENGTH_DIFF extends Number.Number = LENGTH_COMP extends 1 
    ? NaturalNumber._$subtract<A_LENGTH, B_LENGTH> 
    : LENGTH_COMP extends -1 
    ? NaturalNumber._$subtract<B_LENGTH, A_LENGTH> 
    : 0,
  SHORT_PADDED extends DigitList.DigitList = _$padRight<SHORT, LENGTH_DIFF>,
  RESULT extends 1 | 0 | -1 = LENGTH_COMP extends 1 
      ? DigitList._$compare<LONG, SHORT_PADDED>
      : DigitList._$compare<SHORT_PADDED, LONG>
> = RESULT;

export type _$padRight<T extends DigitList.DigitList, N extends Number.Number, M extends DigitList.DigitList = T>
 = N extends 0 ? M : _$padRight<[...M, "0"], NaturalNumber._$decrement<N>>

export type _$compare<
  A extends Number.Number,
  B extends Number.Number,
  RESULT = _$compare2<A, B>
> = RESULT;

interface Compare_T<X extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$compare<X, typeof x>;
}

export interface Compare extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Compare_T<typeof x>;
}

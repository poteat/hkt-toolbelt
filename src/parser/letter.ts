import { Parser, Kind, String, NaturalNumber, Type } from '..'

export type __$letter =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'

export type _$letter<
  STATE extends Parser._$state,
  SLICED_INPUT extends string = String._$slice<STATE['input'], STATE['index']>,
  MATCH_RESULT extends string = SLICED_INPUT extends `${infer L}${string}`
    ? L extends __$letter
      ? L
      : never
    : never
> = MATCH_RESULT extends never
  ? never
  : {
      input: STATE['input']
      index: NaturalNumber._$increment<STATE['index']>
      result: MATCH_RESULT
    }

export interface Letter extends Parser.Parser {
  f(x: Type._$cast<this[Kind._], Parser._$state>): _$letter<typeof x>
}

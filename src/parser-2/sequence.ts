import { $, Parser2, Kind, Type, Conditional } from '..'

export type _$sequence<
  /**
   * The parsers to match.
   */
  PX extends Parser2.Parser[],
  /**
   * The state of the parser.
   */
  STATE extends Parser2._$state,
  /**
   * The results of the parsers, built up over each iteration.
   */
  RESULTS extends unknown[] = [],
  /**
   * The result of the current parser.
   */
  CURRENT_RESULT extends Parser2._$state = PX extends [infer Head, ...unknown[]]
    ? $<
        Type._$cast<Head, Parser2.Parser>,
        Type._$cast<STATE, Kind._$inputOf<Type._$cast<Head, Parser2.Parser>>>
      >
    : never
> = 0 extends 1
  ? never
  : /**
   * We continue matching each successive parser in the sequence. If we have
   * matched all of them, we return the results. If any of them fail, we return
   * never.
   */
  PX extends [unknown, ...infer Tail]
  ? [CURRENT_RESULT] extends [never]
    ? never
    : _$sequence<
        Type._$cast<Tail, Parser2.Parser[]>,
        CURRENT_RESULT,
        [...RESULTS, CURRENT_RESULT['result']]
      >
  : {
      input: STATE['input']
      result: RESULTS
    }

interface Sequence_T<PX extends Parser2.Parser[]> extends Parser2.Parser {
  f(x: Type._$cast<this[Kind._], Parser2._$state>): _$sequence<PX, typeof x>
}

export interface Sequence extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Parser2.Parser[]>): Sequence_T<typeof x>
}

import { $, Parser2, Kind, Type, Conditional } from '..'

export type _$many<
  /**
   * The parser to attempt matches for.
   */
  P extends Parser2.Parser,
  /**
   * The state of the parser.
   */
  STATE extends Parser2._$state,
  /**
   * The results of the parser generated so far.
   */
  RESULTS extends unknown[] = [],
  /**
   * The next state of the parser.
   */
  NEXT_STATE extends Parser2._$state = $<
    P,
    Type._$cast<STATE, Kind._$inputOf<P>>
  >,
  /**
   * The next result of the parser, appending the prior result.
   */
  NEXT_RESULTS extends unknown[] = [...RESULTS, NEXT_STATE['result']]
> = 0 extends 1
  ? never
  : /**
   * If the next state is never, then we have 'exhausted' the parser, such that
   * no further matches can be made.
   */
  Conditional._$equals<NEXT_STATE, never> extends true
  ? {
      input: STATE['input']
      result: RESULTS
    }
  : _$many<P, NEXT_STATE, NEXT_RESULTS>

interface Many_T<P extends Parser2.Parser> extends Parser2.Parser {
  f(x: Type._$cast<this[Kind._], Parser2._$state>): _$many<P, typeof x>
}

export interface Many extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Parser2.Parser>): Many_T<typeof x>
}

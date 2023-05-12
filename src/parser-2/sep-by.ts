import { $, Parser2, Type, Kind } from '..'

export type _$sepBy<
  /**
   * The 'value' parser to be separated.
   */
  VALUE extends Parser2.Parser,
  /**
   * The 'seperator' parser.
   */
  SEPERATOR extends Parser2.Parser,
  /**
   * The state of the parser.
   */
  STATE extends Parser2._$state,
  /**
   * A binary mode flag, either 'value' or 'separator'. This keeps track of
   * whether we are currently parsing a value or a separator.
   *
   * At each step, we alternate between parsing a value and a separator.
   */
  MODE extends 'value' | 'separator' = 'value',
  /**
   * The results of the parser generated so far.
   */
  RESULTS extends unknown[] = [],
  /**
   * Whether this is the first iteration of the parser.
   */
  FIRST_ITERATION extends boolean = true,
  /**
   * The next mode of the parser.
   */
  NEXT_MODE extends 'value' | 'separator' = MODE extends 'value'
    ? 'separator'
    : 'value',
  /**
   * The next state of the parser.
   */
  CURRENT_VALUE_RESULT extends Parser2._$state = $<
    VALUE,
    Type._$cast<STATE, Kind._$inputOf<VALUE>>
  >,
  /**
   * The next state of the parser.
   */
  CURRENT_SEPERATOR_RESULT extends Parser2._$state = $<
    SEPERATOR,
    Type._$cast<STATE, Kind._$inputOf<SEPERATOR>>
  >,
  /**
   * The next result of the parser, appending the prior result.
   */
  NEXT_RESULTS extends unknown[] = MODE extends 'value'
    ? [...RESULTS, CURRENT_VALUE_RESULT['result']]
    : RESULTS
> = 0 extends 1
  ? never
  : MODE extends 'value'
  ? [CURRENT_VALUE_RESULT] extends [never]
    ? FIRST_ITERATION extends true
      ? {
          input: STATE['input']
          result: []
        }
      : never
    : _$sepBy<
        VALUE,
        SEPERATOR,
        CURRENT_VALUE_RESULT,
        NEXT_MODE,
        NEXT_RESULTS,
        false
      >
  : [CURRENT_SEPERATOR_RESULT] extends [never]
  ? {
      input: STATE['input']
      result: RESULTS
    }
  : _$sepBy<
      VALUE,
      SEPERATOR,
      CURRENT_SEPERATOR_RESULT,
      NEXT_MODE,
      NEXT_RESULTS,
      false
    >

interface SepBy_T2<Value extends Parser2.Parser, Sep extends Parser2.Parser>
  extends Parser2.Parser {
  f(
    x: Type._$cast<this[Kind._], Parser2._$state>
  ): _$sepBy<Value, Sep, typeof x>
}

interface SepBy_T<Sep extends Parser2.Parser> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Parser2.Parser>): SepBy_T2<typeof x, Sep>
}

export interface SepBy extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Parser2.Parser>): SepBy_T<typeof x>
}

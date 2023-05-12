import { $, Parser2, Type, Kind } from '..'

export type _$between<
  /**
   * The 'left' parser, to match first.
   */
  LEFT extends Parser2.Parser,
  /**
   * The 'right' parser, to match last.
   */
  RIGHT extends Parser2.Parser,
  /**
   * The 'value' parser, to match in between.
   */
  VALUE extends Parser2.Parser,
  /**
   * The state of the parser.
   */
  STATE extends Parser2._$state,
  /**
   * The result of executing the 'left' parser.
   */
  LEFT_RESULT extends Parser2._$state = $<
    LEFT,
    Type._$cast<STATE, Kind._$inputOf<LEFT>>
  >,
  /**
   * The result of executing the 'value' parser.
   */
  VALUE_RESULT extends Parser2._$state = [LEFT_RESULT] extends [never]
    ? never
    : $<VALUE, Type._$cast<LEFT_RESULT, Kind._$inputOf<VALUE>>>,
  /**
   * The result of executing the 'right' parser.
   */
  RIGHT_RESULT extends Parser2._$state = [VALUE_RESULT] extends [never]
    ? never
    : $<RIGHT, Type._$cast<VALUE_RESULT, Kind._$inputOf<RIGHT>>>
> = [RIGHT_RESULT] extends [never]
  ? never
  : {
      input: RIGHT_RESULT['input']
      result: VALUE_RESULT['result']
    }

interface Between_T3<
  Left extends Parser2.Parser,
  Right extends Parser2.Parser,
  Value extends Parser2.Parser
> extends Parser2.Parser {
  f(
    x: Type._$cast<this[Kind._], Parser2._$state>
  ): _$between<Left, Right, Value, typeof x>
}

interface Between_T2<Left extends Parser2.Parser, Right extends Parser2.Parser>
  extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Parser2.Parser>
  ): Between_T3<Left, Right, typeof x>
}

interface Between_T<Left extends Parser2.Parser> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Parser2.Parser>): Between_T2<Left, typeof x>
}

export interface Between extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Parser2.Parser>): Between_T<typeof x>
}

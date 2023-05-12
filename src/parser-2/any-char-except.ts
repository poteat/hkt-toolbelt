import { $, Parser2, Kind, Type } from '..'

export type _$anyCharExcept<
  /**
   * The parser to ensure does not match.
   */
  P extends Parser2.Parser,
  /**
   * The state of the parser.
   */
  STATE extends Parser2._$state,
  /**
   * The result of executing the provided parser.
   */
  RESULT extends Parser2._$state = $<P, Type._$cast<STATE, Kind._$inputOf<P>>>
> =
  /**
   * If the provided parser never matches, then we slice off the first character
   * of the input and return it as the result.
   *
   * If there is no first character, then we have exhausted the input and return
   * never.
   */
  [RESULT] extends [never]
    ? STATE['input'] extends `${infer Head}${infer Tail}`
      ? {
          input: Type._$cast<Tail, string>
          result: Head
        }
      : never
    : never

interface AnyCharExcept_T<P extends Parser2.Parser> extends Parser2.Parser {
  f(x: Type._$cast<this[Kind._], Parser2._$state>): _$anyCharExcept<P, typeof x>
}

export interface AnyCharExcept extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Parser2.Parser>): AnyCharExcept_T<typeof x>
}

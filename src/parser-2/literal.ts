import { Parser2, Type, Kind } from '..'

export type _$literal<
  /**
   * The state of the parser.
   */
  STATE extends Parser2._$state,
  /**
   * The target string.
   */
  TARGET extends string
> = STATE['input'] extends `${TARGET}${infer Tail}`
  ? {
      input: Tail
      result: TARGET
    }
  : never

interface Literal_T<T extends string> extends Parser2.Parser {
  f(x: Type._$cast<this[Kind._], Parser2._$state>): _$literal<typeof x, T>
}

export interface Literal extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): Literal_T<typeof x>
}

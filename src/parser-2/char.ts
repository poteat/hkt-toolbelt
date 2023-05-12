import { Parser2, Type, Kind } from '..'

export type _$char<
  /**
   * The state of the parser.
   */
  STATE extends Parser2._$state,
  /**
   * The target string.
   */
  TARGET extends string
> = STATE['input'] extends `${infer X extends TARGET}${infer Tail}`
  ? {
      input: Tail
      result: X
    }
  : never

interface Char_T<T extends string> extends Parser2.Parser {
  f(x: Type._$cast<this[Kind._], Parser2._$state>): _$char<typeof x, T>
}

export interface Char extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): Char_T<typeof x>
}

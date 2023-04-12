import { $, Parser2, Kind, Type } from ".."

export type _$choice<
  /**
   * The parsers to choose from.
   */
  PX extends Parser2.Parser[],
  /**
   * The state of the parser.
   */
  STATE extends Parser2._$state,
  /**
   * The result of the current parser.
   */
  CURRENT_RESULT extends Parser2._$state = PX extends [
    infer First,
    ...unknown[]
  ]
    ? $<
        Type._$cast<First, Parser2.Parser>,
        Type._$cast<STATE, Kind._$inputOf<Type._$cast<First, Parser2.Parser>>>
      >
    : never
> =
  /**
   * If the current parser returns a result, we return that result. Otherwise,
   * we continue to the next parser. If there are no more parsers, we return
   * `never`.
   */
  PX extends [unknown, ...infer Rest]
    ? [CURRENT_RESULT] extends [never]
      ? _$choice<Type._$cast<Rest, Parser2.Parser[]>, STATE>
      : CURRENT_RESULT
    : never

interface Choice_T<PX extends Parser2.Parser[]> extends Parser2.Parser {
  f(x: Type._$cast<this[Kind._], Parser2._$state>): _$choice<PX, typeof x>
}

export interface Choice extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Parser2.Parser[]>): Choice_T<typeof x>
}

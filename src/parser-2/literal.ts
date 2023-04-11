import { DigitList, StringList, Parser2, Type, Kind, String } from ".."

export type _$literal<
  /**
   * The state of the parser.
   */
  STATE extends Parser2._$state,
  /**
   * The target string.
   */
  TARGET extends string,
  /**
   * The target string as a list.
   */
  TARGET_LIST extends string[],
  /**
   * The index of the first character in the target string that has not yet been
   * consumed.
   */
  INDEX_TARGET extends DigitList.DigitList = ["0"],
  /**
   * The current character in the input string.
   */
  CURRENT_INPUT_CHAR extends string = StringList._$at<
    STATE["input"],
    STATE["index"]
  >,
  /**
   * The current character in the target string.
   */
  CURRENT_TARGET_CHAR extends string = StringList._$at<
    TARGET_LIST,
    INDEX_TARGET
  >,
  /**
   * We are done processing if the current target character is undefined.
   */
  DONE extends boolean = CURRENT_TARGET_CHAR extends undefined ? true : false,
  /**
   * Whether or not both the current input character and the current target
   * character are equal.
   */
  BOTH_MATCH extends boolean = CURRENT_INPUT_CHAR extends CURRENT_TARGET_CHAR
    ? true
    : false
> =
  /**
   * We iterate over each character in the target string and input string, and
   * compare them. If they are equal, we continue to the next character. If they
   * are not equal, we return `never`.
   *
   * If we reach the end of the target string, we return the result of the
   * parser.
   */
  DONE extends true
    ? {
        input: STATE["input"]
        index: STATE["index"]
        result: TARGET
      }
    : BOTH_MATCH extends true
    ? _$literal<
        {
          input: STATE["input"]
          index: DigitList._$increment<STATE["index"]>
          result: STATE["result"]
        },
        TARGET,
        TARGET_LIST,
        DigitList._$increment<INDEX_TARGET>
      >
    : never

type _$literal2<
  /**
   * The state of the parser.
   */
  STATE extends Parser2._$state,
  /**
   * The target string.
   */
  TARGET extends string
> = _$literal<STATE, TARGET, String._$toList<TARGET>>

interface Literal_T<T extends string> extends Parser2.Parser {
  f(x: Type._$cast<this[Kind._], Parser2._$state>): _$literal2<typeof x, T>
}

export interface Literal extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): Literal_T<typeof x>
}

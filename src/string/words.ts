import { String, Type, Kind } from '..'

type _$isDelimiter<S extends string> = S extends ' ' | '-' | '_' ? true : false

/**
 * `_$words` is a type-level function that takes in a string `S` and returns
 * a list of words in the string. Words are defined as sequences of characters
 * separated by whitespace, or delimited by case changes. Acronyms in the input
 * are identified as individual words.
 *
 * Consecutive digits are treated as their own word, separate from any adjacent
 * letter characters.
 *
 * @template {string} S - The string to split.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * type Result = String._$words<'helloWorld'>; // ['hello', 'World']
 * type Result2 = String._$words<'hello world'>; // ['hello', 'world']
 * type Result3 = String._$words<'XMLHttpRequest'>; // ['XML', 'Http', 'Request']
 * ```
 */
export type _$words<
  S extends string,
  /**
   * The current word being built up as we iterate through the string,
   * represented as a list of characters.
   */
  CURRENT_WORD extends string[] = [],
  /**
   * The list of words currently identified.
   */
  WORDS extends unknown[] = [],
  /**
   * The previous character in the string.
   */
  PREV_CHAR extends string = ''
> = S extends `${infer Head}${infer Tail}`
  ? _$isDelimiter<Head> extends true
    ? /**
       * The current character is a delimiter, so check if the current word is
       * empty.
       */
      CURRENT_WORD['length'] extends 0
      ? /**
         * If the character is a delimiter, and the current word is empty, skip
         * the current character.
         */
        _$words<Tail, CURRENT_WORD, WORDS, Head>
      : /**
         * If the character is a delimiter, and the current word is not empty,
         * add the current word to the list of words and start a new empty word.
         */
        _$words<Tail, [], [...WORDS, String._$fromList<CURRENT_WORD>], Head>
    : /**
       * The character is not a delimiter, so perform additional checks.
       */
      String._$isUppercaseLetter<Head> extends true
      ? String._$isUppercaseLetter<PREV_CHAR> extends true
        ? /**
           * If both the current character and the previous character are
           * uppercase, we need to look ahead to see if the next character is
           * lowercase. If it is, we treat the current character as the start of
           * a new word.
           */
          Tail extends `${infer Next}${string}`
          ? String._$isLowercaseLetter<Next> extends true
            ? /**
               * Since the next character is lowercase, treat the current
               * character as the start of a new word.
               */
              CURRENT_WORD['length'] extends 0
              ? /**
                 * If the current word is empty, add the current character to
                 * the current word.
                 */
                _$words<Tail, [Head], WORDS, Head>
              : /**
                 * If the current word is not empty, add the current word to
                 * the list of words and start a new empty word.
                 */
                _$words<
                  Tail,
                  [Head],
                  [...WORDS, String._$fromList<CURRENT_WORD>],
                  Head
                >
            : /**
               * Otherwise, the next character is not lowercase, so we can defer
               * handling to the next iteration.
               */
              _$words<Tail, [...CURRENT_WORD, Head], WORDS, Head>
          : /**
             * If both this character and the prior character was uppercase,
             * and there is no next character, we can defer handling to the
             * next iteration.
             */
            _$words<Tail, [...CURRENT_WORD, Head], WORDS, Head>
        : /**
           * If the previous character is lowercase, then we are transitioning
           * from lowercase to uppercase, which implies the start of a new word.
           */
          String._$isLowercaseLetter<PREV_CHAR> extends true
          ? CURRENT_WORD['length'] extends 0
            ? /**
               * If the current word is empty, add the current character to the
               * current word.
               */
              _$words<Tail, [Head], WORDS, Head>
            : /**
               * If the current word is not empty, add the current word to the
               * list of words and start a new empty word.
               */
              _$words<
                Tail,
                [Head],
                [...WORDS, String._$fromList<CURRENT_WORD>],
                Head
              >
          : /**
             * If the previous character was not lowercase, and the current
             * character is uppercase, then we include the current character in
             * the current word.
             */
            _$words<Tail, [...CURRENT_WORD, Head], WORDS, Head>
      : /**
         * If the current character isn't uppercase, we check if it's a digit.
         * If it is, it is treated as a separate word from any adjacent letter
         * characters.
         */
        String._$isDigit<Head> extends true
        ? /**
           * Because the prior character might also be a digit, we check if it
           * is. If it is a prior digit, then the current character should be
           * appended to that word.
           */
          String._$isDigit<PREV_CHAR> extends true
          ? _$words<Tail, [...CURRENT_WORD, Head], WORDS, Head>
          : CURRENT_WORD['length'] extends 0
            ? /**
               * If the current word is empty, add the current character to the
               * a new word.
               */
              _$words<Tail, [Head], WORDS, Head>
            : /**
               * If the current word is not empty, add the current word to the
               * list of words and start a new empty word.
               */
              _$words<
                Tail,
                [Head],
                [...WORDS, String._$fromList<CURRENT_WORD>],
                Head
              >
        : /**
           * If the current character is not uppercase or a digit, then we treat
           * it as part of the current word as long as the previous character
           * was not a digit.
           */
          String._$isDigit<PREV_CHAR> extends true
          ? /**
             * If the previous character was a digit, and the current character
             * isn't, then we need to start a new word.
             */
            CURRENT_WORD['length'] extends 0
            ? /**
               * If the current word is empty, add the current character to the
               * current word.
               */
              _$words<Tail, [Head], WORDS, Head>
            : /**
               * If the current word is not empty, add the current word to the
               * list of words and start a new empty word.
               */
              _$words<
                Tail,
                [Head],
                [...WORDS, String._$fromList<CURRENT_WORD>],
                Head
              >
          : _$words<Tail, [...CURRENT_WORD, Head], WORDS, Head>
  : /**
     * If we've iterated through all of the characters, return the list of
     * collected words.
     */
    CURRENT_WORD['length'] extends 0
    ? WORDS
    : [...WORDS, String._$fromList<CURRENT_WORD>]

/**
 * `Words` is a type-level function that takes in a string `S` and returns
 * a list of words in the string. Words are defined as sequences of characters
 * separated by whitespace, or delimited by case changes. Acronyms in the input
 * are identified as individual words.
 *
 * Consecutive digits are treated as their own word, separate from any adjacent
 * letter characters.
 *
 * @template {string} S - The string to split.
 *
 * @example
 * ```ts
 * import { $, String } from "hkt-toolbelt";
 *
 * type Result = $<String.Words, 'helloWorld'>; // ['hello', 'World']
 * type Result2 = $<String.Words, 'hello world'>; // ['hello', 'world']
 * type Result3 = $<String.Words, 'XMLHttpRequest'>; // ['XML', 'Http', 'Request']
 * ```
 */
export interface Words extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$words<typeof x>
}

const isUpperCase = (char: string) => char >= 'A' && char <= 'Z'

const isLowerCase = (char: string) => char >= 'a' && char <= 'z'

const isDigit = (char: string) => char >= '0' && char <= '9'

const isDelimiter = (char: string) =>
  char === ' ' || char === '-' || char === '_'

const isLetter = (char: string) => isUpperCase(char) || isLowerCase(char)

/**
 * Given a string, return a list of words in the string.
 *
 * @param {string} input - The string to split into words.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.words('hello42world')
 * //    ^? ['hello', '42', 'world']
 * ```
 */
export const words = ((input: string) => {
  const words: string[] = []
  let currentWord = ''

  for (let i = 0; i < input.length; i++) {
    const char = input[i]
    const prevChar = i > 0 ? input[i - 1] : ''
    const nextChar = i < input.length - 1 ? input[i + 1] : ''

    if (isDelimiter(char)) {
      if (currentWord.length > 0) {
        words.push(currentWord)
        currentWord = ''
      }
      continue
    }

    const isCurrentDigit = isDigit(char)
    const isPrevDigit = isDigit(prevChar)
    const isCurrentUpper = isUpperCase(char)
    const isPrevUpper = isUpperCase(prevChar)
    const isPrevLower = isLowerCase(prevChar)
    const isNextLower = isLowerCase(nextChar)

    if (isCurrentDigit) {
      if (!isPrevDigit && currentWord.length > 0) {
        // Transition from non-digit to digit, start new word
        words.push(currentWord)
        currentWord = char
      } else {
        currentWord += char
      }
    } else if (isLetter(char)) {
      if (isPrevDigit && currentWord.length > 0) {
        // Transition from digit to letter, start new word
        words.push(currentWord)
        currentWord = char
      } else if (
        isCurrentUpper &&
        (isPrevLower || (isPrevUpper && isNextLower))
      ) {
        // Transition from lowercase to uppercase or acronym ending
        if (currentWord.length > 0) {
          words.push(currentWord)
        }
        currentWord = char
      } else {
        currentWord += char
      }
    } else {
      // Other characters (non-letter, non-digit, non-delimiter)
      if (currentWord.length > 0) {
        words.push(currentWord)
        currentWord = ''
      }
    }
  }

  // Add the last word if it's not empty
  if (currentWord.length > 0) {
    words.push(currentWord)
  }

  return words
}) as Kind._$reify<Words>

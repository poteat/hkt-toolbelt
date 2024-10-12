import { Kind, Type, String } from '..'

/**
 * `_$camelCase` is a type-level function that takes in a string `S` and returns
 * a new string in the "camelCase" format, whereby the first letter of each word
 * is capitalized, except for the first word. Capitalized acronyms in the input
 * are identified.
 *
 * @template {string} S - The string to convert.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * type Result = String._$camelCase<'hello world'>; // 'helloWorld'
 * ```
 */
export type _$camelCase<
  S extends string,
  WORDS extends string[] = String._$words<S>
> = String._$fromList<{
  [K in keyof WORDS]: K extends '0'
    ? String._$toLower<WORDS[K]>
    : String._$capitalize<String._$toLower<WORDS[K]>>
}>

/**
 * `CamelCase` is a type-level function that takes in a string `S` and returns
 * a new string in the "camelCase" format, whereby the first letter of each word
 * is capitalized, except for the first word. Capitalized acronyms in the input
 * are identified.
 *
 * @template {string} S - The string to convert.
 *
 * @example
 * ```ts
 * import { $, String } from "hkt-toolbelt";
 *
 * type Result = $<String.CamelCase, 'hello world'>; // 'helloWorld'
 * ```
 */
export interface CamelCase extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$camelCase<typeof x>
}

/**
 * Given a string, return a new string in the "camelCase" format, whereby the
 * first letter of each word is capitalized, except for the first word.
 *
 * @param {string} x - The string to convert.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.camelCase('hello world')
 * //    ^? 'helloWorld'
 * ```
 */
export const camelCase = ((x: string) =>
  String.words(x)
    .map((word, i) =>
      i === 0 ? word.toLowerCase() : String.capitalize(word.toLowerCase())
    )
    .join('')) as Kind._$reify<CamelCase>

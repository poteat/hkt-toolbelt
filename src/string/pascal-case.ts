import { Kind, Type, String as String_ } from '..'

/**
 * `_$pascalCase` is a type-level function that takes in a string `S` and returns
 * a new string in the "PascalCase" format.
 *
 * @template {string} S - The string to convert.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * type Result = String._$pascalCase<'hello world'>; // 'HelloWorld'
 * ```
 */
export type _$pascalCase<
  S extends string,
  WORDS extends string[] = String_._$words<S>
> = String_._$fromList<{
  [K in keyof WORDS]: String_._$capitalize<String_._$toLower<WORDS[K]>>
}>

/**
 * `PascalCase` is a type-level function that takes in a string `S` and returns
 * a new string in the "PascalCase" format.
 *
 * @template {string} S - The string to convert.
 *
 * @example
 * ```ts
 * import { $, String } from "hkt-toolbelt";
 *
 * type Result = $<String.PascalCase, 'hello world'>; // 'HelloWorld'
 * ```
 */
export interface PascalCase extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$pascalCase<typeof x>
}

/**
 * Given a string, return a new string in the "PascalCase" format, whereby the
 * first letter of each word is capitalized.
 *
 * @param {string} x - The string to convert.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.pascalCase('hello world')
 * //    ^? 'HelloWorld'
 * ```
 */
export const pascalCase = ((x: string) =>
  String_.words(x)
    .map((word) => String_.capitalize(word.toLowerCase()))
    .join('')) as Kind._$reify<PascalCase>

import { Kind, Type, String as String_ } from '..'

/**
 * `_$kebabCase` is a type-level function that takes in a string `S` and returns
 * a new string in the "kebab-case" format, whereby each word is lowercased and
 * separated by hyphens.
 *
 * @template {string} S - The string to convert.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * type Result = String._$kebabCase<'hello world'>; // 'hello-world'
 * ```
 */
export type _$kebabCase<
  S extends string,
  WORDS extends string[] = String_._$words<S>
> = String_._$join<
  {
    [K in keyof WORDS]: String_._$toLower<WORDS[K]>
  },
  '-'
>

/**
 * `KebabCase` is a type-level function that takes in a string `S` and returns
 * a new string in the "kebab-case" format, whereby each word is lowercased and
 * separated by hyphens.
 *
 * @template {string} S - The string to convert.
 *
 * @example
 * ```ts
 * import { $, String } from "hkt-toolbelt";
 *
 * type Result = $<String.KebabCase, 'hello world'>; // 'hello-world'
 * ```
 */
export interface KebabCase extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$kebabCase<typeof x>
}

/**
 * Given a string, return a new string in the "kebab-case" format, whereby each
 * word is lowercased and separated by hyphens.
 *
 * @param {string} x - The string to convert.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.kebabCase('hello world')
 * //    ^? 'hello-world'
 * ```
 */
export const kebabCase = ((x: string) =>
  String_.words(x)
    .map((word) => word.toLowerCase())
    .join('-')) as Kind._$reify<KebabCase>

import { Kind, Type, String as String_ } from '..'

/**
 * `_$snakeCase` is a type-level function that takes in a string `S` and returns
 * a new string in the "snake_case" format, whereby each word is lowercased and
 * separated by underscores.
 *
 * @template {string} S - The string to convert.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * type Result = String._$snakeCase<'hello world'>; // 'hello_world'
 * ```
 */
export type _$snakeCase<
  S extends string,
  WORDS extends string[] = String_._$words<S>
> = String_._$join<
  {
    [K in keyof WORDS]: String_._$toLower<WORDS[K]>
  },
  '_'
>

/**
 * `SnakeCase` is a type-level function that takes in a string `S` and returns
 * a new string in the "snake_case" format, whereby each word is lowercased and
 * separated by underscores.
 *
 * @template {string} S - The string to convert.
 *
 * @example
 * ```ts
 * import { $, String } from "hkt-toolbelt";
 *
 * type Result = $<String.SnakeCase, 'hello world'>; // 'hello_world'
 * ```
 */
export interface SnakeCase extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$snakeCase<typeof x>
}

/**
 * Given a string, return a new string in the "snake_case" format, whereby each
 * word is lowercased and separated by underscores.
 *
 * @param {string} x - The string to convert.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.snakeCase('hello world')
 * //    ^? 'hello_world'
 * ```
 */
export const snakeCase = ((x: string) =>
  String_.words(x)
    .map((word) => word.toLowerCase())
    .join('_')) as Kind._$reify<SnakeCase>

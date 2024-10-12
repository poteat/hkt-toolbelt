import { Kind, Type, String as String_ } from '..'

/**
 * `_$constantCase` is a type-level function that takes in a string `S` and returns
 * a new string in the "CONSTANT_CASE" format, whereby each word is uppercased
 * and separated by underscores.
 *
 * @template {string} S - The string to convert.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * type Result = String._$constantCase<'hello world'>; // 'HELLO_WORLD'
 * ```
 */
export type _$constantCase<
  S extends string,
  WORDS extends string[] = String_._$words<S>
> = String_._$join<
  {
    [K in keyof WORDS]: String_._$toUpper<WORDS[K]>
  },
  '_'
>

/**
 * `ConstantCase` is a type-level function that takes in a string `S` and returns
 * a new string in the "CONSTANT_CASE" format, whereby each word is uppercased
 * and separated by underscores.
 *
 * @template {string} S - The string to convert.
 *
 * @example
 * ```ts
 * import { $, String } from "hkt-toolbelt";
 *
 * type Result = $<String.ConstantCase, 'hello world'>; // 'HELLO_WORLD'
 * ```
 */
export interface ConstantCase extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$constantCase<typeof x>
}

/**
 * Given a string, return a new string in the "CONSTANT_CASE" format, whereby
 * each word is uppercased and separated by underscores.
 *
 * @param {string} x - The string to convert.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.constantCase('hello world')
 * //    ^? 'HELLO_WORLD'
 * ```
 */
export const constantCase = ((x: string) =>
  String_.words(x)
    .map((word) => word.toUpperCase())
    .join('_')) as Kind._$reify<ConstantCase>

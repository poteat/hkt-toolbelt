/**
 * `String._$includes` is a type-level function that checks if a string includes a given infix.
 * 
 * @template Infix - The infix to check for.
 * @template S - The string to check.
 * 
 * @example
 * type T0 = String._$includes<'oba', 'foobar'> // true
 * type T1 = String._$includes<'qux', 'foobar'> // false
 */
export type _$includes<
  Infix extends string,
  S extends string
> = S extends `${string}${Infix}${string}` ? true : false

/**
 * `String.Includes_T` is an intermediate interface for currying.
 * 
 * @template Infix - The infix to check for.
 */
interface Includes_T<Infix extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$includes<Infix, typeof x>
}

/**
 * `String.Includes` is a type-level function that checks if a string includes a given infix.
 * 
 * @template Infix - The infix to check for.
 * @template S - The string to check.
 * 
 * @example
 * type T0 = $<$<String.Includes, 'oba'>, 'foobar'> // true
 * type T1 = $<$<String.Includes, 'qux'>, 'foobar'> // false
 */
export interface Includes extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): Includes_T<typeof x>
}

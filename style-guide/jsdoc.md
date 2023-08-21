All exported utilities must be documented using JSDoc.

Type utilities are usually of the structure:

```ts
export type _$utility<T> = ...

export interface Utility extends Kind.Kind {
  f(x: this[Kind._]): _$utility<typeof x>
}
```

In this case, we document both the type and the interface. Usually, the contents of the JSDoc are similar between them.

```ts
/**
 * `String.Length` is a type-level function that returns the length of a string.
 * 
 * @template S - The string to get the length of.
 * 
 * @example
 * type T0 = String._$length<'hello'> // 5
 * type T1 = String._$length<''> // 0
 */
export type _$length<S extends string> = ...

/**
 * `String.Length` is a type-level function that returns the length of a string.
 * 
 * @template S - The string to get the length of.
 * 
 * @example
 * type T0 = $<String.Length, 'hello'> // 5
 * type T1 = $<String.Length, ''> // 0
 */
export interface Length extends Kind.Kind {
  f(x: this[Kind._]): _$length<typeof x>
}
```

In all cases, adequate examples should be provided. Take note that the examples properly use the `_$` and `$` syntaxes. When using the `$` syntax, ensure that it is used correctly. For example, if you are demonstrating a type-level function that takes two arguments, the `$` syntax should be used twice, like so: `$<$<String.Append, 'bar'>, 'foo'>`.

## Case of 2+ ary kinds

2-ary kinds possess an intermediate interface for currying. This interface is not exported, and thus doesn't need to be documented. **Note: Do not add JSDoc comments to these unexported intermediary interfaces.** Here is an example:

```ts
/**
 * `String.EndsWith` is a type-level function that checks if a string ends with a given suffix.
 * 
 * @template Suffix - The suffix to check for.
 * @template S - The string to check.
 * 
 * @example
 * type T0 = String._$endsWith<'bar', 'foobar'> // true
 * type T1 = String._$endsWith<'foo', 'foobar'> // false
 */
export type _$endsWith<
  Suffix extends string,
  S extends string
> = S extends `${string}${Suffix}` ? true : false

interface EndsWith_T<T extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$endsWith<T, typeof x>
}

/**
 * `String.EndsWith` is a type-level function that checks if a string ends with a given suffix.
 * 
 * @example
 * type T0 = $<$<String.EndsWith, 'bar'>, 'foobar'> // true
 * type T1 = $<$<String.EndsWith, 'foo'>, 'foobar'> // false
 */
export interface EndsWith extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): EndsWith_T<typeof x>
}
```

In this example, `EndsWith_T` is the intermediate interface for currying and is not exported, so it doesn't have a JSDoc comment. The examples for `_$endsWith` and `EndsWith` demonstrate the correct usage of 2-ary kinds, providing all parameters.

## Case of multi-stage kinds

Some kinds are quite complex, and are defined via long sequences of generic parameters. In these cases, each stage should be documented. The following is  a simplified example.

```ts
export type _$complex<
  /**
   * @template A - The first number to add.
   */
  A extends number,

  /**
   * @template B - The second number to add.
   */
  B extends number,

  /**
   * @template C - The carry digit from the prior computation.
   */
  CARRY extends number = 0,

  /**
   * @template CURRENT_SUM - The current sum of the digits. This is computed on
   * every step of the recursion.
   */
  CURRENT_SUM extends number = ...
> = ...
```

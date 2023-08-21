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

## Case of 2+ ary kinds and Kind interfaces

2-ary kinds possess an intermediate interface for currying. This interface is not exported, and thus doesn't need to be documented. **Note: Do not add JSDoc comments to these unexported intermediary interfaces.**

Kind interfaces like `Split` should have their template parameters documented, even though they 'syntactically' don't possess generics. This is because these interfaces are used in a way that effectively makes them generic, and documenting these 'effective generics' helps provide clarity on their usage.

For example, `String.Split` is a type-level function that splits a string into an array of substrings. It takes two template parameters: `S` which is the string to split, and `Delimiter` which is the delimiter to split the string by. Even though `Split` doesn't syntactically possess these generics, they are effectively used in the implementation and should therefore be documented.

Here is an example:

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

/**
 * `String.EndsWith_T` is an intermediate interface for currying.
 * 
 * @template Suffix - The suffix to check for.
 */
interface EndsWith_T<Suffix extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$endsWith<Suffix, typeof x>
}

/**
 * `String.EndsWith` is a type-level function that checks if a string ends with a given suffix.
 * 
 * @template Suffix - The suffix to check for.
 * @template S - The string to check.
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

Some kinds are quite complex, and are defined via long sequences of generic parameters. In these cases, each template should be documented. The following is a simplified example.

```ts
/**
 * `Number.Complex` is a type-level function that complexes two numbers.
 * 
 * @template A - The first number to add.
 * @template B - The second number to add.
 * @template C - The carry digit from the prior computation.
 * @template CURRENT_SUM - The current sum of the digits. This is computed on
 * every step of the recursion.
 * ...
 */
export type _$complex<
  A extends number,
  B extends number,
  CARRY extends number = 0,
  CURRENT_SUM extends number = ...
> = ...
```

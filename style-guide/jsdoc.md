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

In all cases, adequate examples should be provided. Take note that the examples properly use the `_$` and `$` syntaxes.

## Case of 2+ ary kinds

2-ary kinds possess an intermediate interface for currying. This interface is not exported, and thus doesn't need to be documented.

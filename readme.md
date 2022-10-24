# hkt-toolbelt

A higher-kinded-type companion to ts-toolbelt.

## Installation

```bash
npm install hkt-toolbelt
```

## Usage

```ts
import { List, Conditional } from "hkt-toolbelt/list";

// Filter a tuple to only numbers
type FilterNumbers = List.Filter<Conditional.SubtypeOf<number>>;

// A :: [1, 2, 3]
type A = $<FilterNumbers, [1, null, 2, 3, "4"]>;
```

## Purpose

This library is a companion to [ts-toolbelt]() that provides higher-kinded-type versions of its functionality. This allows for more complex types to be constructed.

- [hkt-toolbelt](#hkt-toolbelt)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Purpose](#purpose)
- [API](#api)
  - [Basic Utilities](#basic-utilities)
    - [$<F, A>](#f-a)
    - [Cast<A, B>](#casta-b)
  - [Boolean Types](#boolean-types)
    - [Boolean.And\<A>](#booleananda)
    - [Boolean.Not](#booleannot)
  - [Conditional Types](#conditional-types)
    - [Conditional.Equals\<A>](#conditionalequalsa)
    - [Conditional.SubtypeOf\<A>](#conditionalsubtypeofa)
  - [Function Types](#function-types)
    - [Function](#function)
    - [Function.Constant\<A>](#functionconstanta)
    - [Function.Identity](#functionidentity)
  - [Kind Types](#kind-types)
    - [Kind\<F>](#kindf)
    - [Kind.Composable\<FX>](#kindcomposablefx)
    - [Kind.Compose\<FX>](#kindcomposefx)
    - [Kind.\_](#kind_)
  - [List Types](#list-types)
    - [List.Map\<F>](#listmapf)
    - [List.Find\<F>](#listfindf)
    - [List.Filter\<F>](#listfilterf)
    - [List.Append\<F>](#listappendf)
    - [List.Last\<T>](#listlastt)
    - [List.Pair\<T>](#listpairt)
  - [String Types](#string-types)
    - [String.StartsWith\<S>](#stringstartswiths)
    - [String.EndsWith\<S>](#stringendswiths)
    - [String.Includes\<S>](#stringincludess)
    - [String.Append\<S>](#stringappends)
    - [String.Prepend\<S>](#stringprepends)

# API

The curried nature of the functions in this library is intended to be utilized to compose types using point-free style. In this respect, API types will first take in 'operations' and then the data to be operated on.

All type functions (e.g. full Kinds) take in _one_ parameter at a time, to support currying and point-free style.

## Basic Utilities

### $<F, A>

The `$` operator is used to apply a higher-kinded-type function to a type. It is equivalent to the `F<A>` syntax in TypeScript.

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.Append<" world">, "hello">; // "hello world"
```

### Cast<A, B>

The `Cast` type is used to cast a type to another type. It is equivalent to the `A as B` syntax in TypeScript. For subtle cases.

```ts
import { Cast } from "hkt-toolbelt";

type Result = Cast<"hello", string>; // "hello"
```

## Boolean Types

### Boolean.And\<A>

The `And` type takes in a boolean and returns a function that takes in another boolean and returns the result of the two booleans being `&&`'d together.

```ts
import $, { Boolean } from "hkt-toolbelt";

type Result = $<Boolean.And<true>, false>; // false
```

### Boolean.Not

The `Not` type takes in a boolean and returns the opposite boolean.

```ts
import $, { Boolean } from "hkt-toolbelt";

type Result = $<Boolean.Not, true>; // false
```

## Conditional Types

### Conditional.Equals\<A>

The `Equals` type is used to check if a type is equal to another type. It is equivalent to the `A extends B ? (B extends A ? true : false) : false` syntax in TypeScript.

`Equals` returns a higher-kinded-type function that takes a type and returns a boolean.

```ts
import $, { Conditional } from "hkt-toolbelt";

type Result = $<Conditional.Equals<"foo">, "bar">; // false
```

### Conditional.SubtypeOf\<A>

The `SubtypeOf` type is used to check if a type is a subtype of another type. It is equivalent to the `A extends B ? true : false` syntax in TypeScript.

The first type passed in is the supertype, and the second type passed in is the subtype.

`SubtypeOf` returns a higher-kinded-type function that takes a type and returns a boolean.

```ts
import $, { Conditional } from "hkt-toolbelt";

type Result = $<Conditional.SubtypeOf<string>, "bar">; // true
```

## Function Types

### Function

The `Function` type is a supertype of all functions, i.e. all functions are a subtype of `Function`. It is not a kind and cannot be applied.

### Function.Constant\<A>

The `Constant` type takes in a type and returns a function that takes in any type and returns the original type. It ignores its applied input and always returns the configured type.

```ts
import $, { Function } from "hkt-toolbelt";

type Result = $<Function.Constant<"foo">, number>; // "foo"
```

### Function.Identity

The `Identity` type takes in a type and returns the same type, on the higher-kinded-type level.

```ts
import $, { Function } from "hkt-toolbelt";

type Result = $<Function.Identity, "foo">; // "foo"
```

## Kind Types

### Kind\<F>

The `Kind` type denotes a type function that may be applied to a type using `$`.

The Kind type can optionally be provided a function type to increase the specificity of its internal parameter and return types. This is used to create new kinds.

### Kind.Composable\<FX>

The `Composable` type checks whether a tuple of kinds are composable. A tuple of kinds is composable if the output of kind $N$ is a subtype of the input of kind $N-1$.

```ts
import $, { Kind, String } from "hkt-toolbelt";

type Result = $<Kind.Composable, [String.Append<"bar">, String.Append<"foo">]>; // true
```

### Kind.Compose\<FX>

The `Compose` type takes in a tuple of type functions, and composes them into one type function.

`Compose` checks that the tuple of kinds is composable, and returns a higher-kinded-type function that takes in a type and returns the result of the composition.

`Compose` executes functions from right to left, i.e. the last function in the tuple is executed first - as is traditional in mathematics.

```ts
import $, { Kind, String } from "hkt-toolbelt";

type Result = $<
  Kind.Compose<[String.Append<"bar">, String.Append<"foo">]>,
  "hello "
>; // "hello foobar"
```

### Kind.\_

The `_` type represents the 'unique placeholder type' used in type functions before application. `Kind._` is used by `$` for application.

## List Types

### List.Map\<F>

The `Map` function takes in a type function, and returns a higher kinded type that takes in a tuple type. It applies the given type function over every element in the tuple.

```ts
import $, { List, String } from "hkt-toolbelt";

type Result = $<List.Map<String.Append<"bar">>, ["foo", "baz"]>; // ["foobar", "bazbar"]
```

### List.Find\<F>

The `Find` function takes in a type function, then a tuple, and returns the first tuple element for which the finder function returns `true`. If no such element exists, `Find` returns `never`.

```ts
import $, { List, String } from "hkt-toolbelt";

type Result = $<List.Find<String.StartsWith<"foo">>, ["bar", "foobar"]>; // "foobar"
```

### List.Filter\<F>

The `Filter` function takes in a type function, and a tuple, and returns a tuple in-order of the input tuple, whereby only elements for which the filter function returns `true` remain in the resultant tuple.

```ts
import $, { List, String } from "hkt-toolbelt";

type Result = $<List.Filter<String.StartsWith<"foo">>, ["bar", "foobar"]>; // ["foobar"]
```

### List.Append\<F>

The `Append` function takes in a type, and a tuple, and applies the type such that it is appended to the end of the provided tuple.

```ts
import $, { List } from "hkt-toolbelt";

type Result = $<List.Append<"bar">, ["foo", "baz"]>; // ["foo", "baz", "bar"]
```

### List.Last\<T>

The `Last` function takes in a tuple, and returns the last element of the tuple. In the case of tuples with variadic elements, the variadic element is properly handled, even if it's infix.

```ts
import $, { List } from "hkt-toolbelt";

type Result = $<List.Last, ["foo", "bar", "baz"]>; // "baz"
```

### List.Pair\<T>

The `Pair` function takes in a tuple, and returns a tuple of tuples, where each tuple is a pair of the original tuple's elements, in order. e.g. `[1, 2, 3]` becomes `[[1, 2], [2, 3]]`.

```ts
import $, { List } from "hkt-toolbelt";

type Result = $<List.Pair, [1, 2, 3]>; // [[1, 2], [2, 3]]
```

For variadic tuples, the variadic element is handled via introducing unions to represent the possible combinations of variadic pair elements.

## String Types

### String.StartsWith\<S>

The `StartsWith` function takes in a string literal and returns whether or not it starts with the given prefix, returning `true` or `false` as appropriate.

All strings _start with_ `string`, so `StartsWith<string>` will return true for all subsequent string types.

However, `string` starts with no particular prefix, so `$<StartsWith<"f">, string>` will result in false. All strings start with the empty string, as well.

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.StartsWith<"foo">, "foobar">; // true
```

### String.EndsWith\<S>

The `EndsWith` function takes in a string literal and returns whether or not it ends with the given suffix, returning `true` or `false` as appropriate.

@see `String.StartsWith`

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.EndsWith<"bar">, "foobar">; // true
```

### String.Includes\<S>

The `Includes` function takes in a string literal and returns whether or not it is a substring of the given string, returning `true` or `false` as appropriate.

@see `String.StartsWith`

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.Includes<"foo">, "barfoobar">; // true
```

### String.Append\<S>

The `Append` function takes in a string literal and returns a higher-kinded-type function that takes in a string and returns the result of appending the string literal to the end of the string.

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.Append<"bar">, "foo">; // "foobar"
```

### String.Prepend\<S>

The `Prepend` function takes in a string literal and returns a higher-kinded-type function that takes in a string and returns the result of prepending the string literal to the beginning of the string.

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.Prepend<"foo">, "bar">; // "foobar"
```

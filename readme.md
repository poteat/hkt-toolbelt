![logo](docs/logo.jpeg)

<p align="center">
  <a href="https://www.npmjs.com/package/hkt-toolbelt">
    <img src=https://img.shields.io/npm/v/hkt-toolbelt?color=green>
  </a>
  <img src=https://img.shields.io/github/workflow/status/poteat/hkt-toolbelt/build>
  <img src=https://img.shields.io/github/repo-size/poteat/hkt-toolbelt>
  <br>
  <img src=https://img.shields.io/npm/dw/hkt-toolbelt>
  <img src=https://img.shields.io/github/license/poteat/hkt-toolbelt>
  <a href="https://code.lol">
    <img src=https://img.shields.io/badge/blog-code.lol-blue>
  </a>
</p>

<p align="center">
  <i>Functional and composable type utilities</i>
</p>

---

This library provides type-level utilities across many domains that may be mapped and combined in a functional way, using higher-kinded types.

Write robust, type-safe software with the benefit of composable and compile-time efficient types.

We aim to support hundreds of kind categories, including **List**, **Boolean**, **String**, **Function**, and more. We also provide a set of combinators for composing types.

<p align="right">
<b>Translations</b>
<br>
  <a href="https://github.com/poteat/hkt-toolbelt#readme">
    <img src="https://img.shields.io/badge/docs-english-blue">
  </a>
  <a href="./docs/readme.chinese.md">
    <img src="https://img.shields.io/badge/-中文-blue">
  </a>
</p>

## 1.1. Installation

```bash
> npm install hkt-toolbelt
```

## 1.2. Usage

In short, **`hkt-toolbelt`** let's you go from this:

```ts
/**
 * Remove all non-numeric elements from a tuple.
 */
type FilterNum<T extends unknown[]> = T extends [Head, ...Tail]
  ? Head extends number
    ? [Head, ...FilterNum<Tail>]
    : FilterNum<Tail>
  : [];
```

To this:

```ts
import $, { List, Conditional } from "hkt-toolbelt";

type FilterNum = List.Filter<Conditional.Extends<number>>;
```

**`hkt-toolbelt`** let's you express advanced types in a readable way, via composition of higher-kinded primitives.

### 1.2.1. Kind Apply with $

You apply your kinds to an input with the `$` operator:

```ts
type Result = $<FilterNum, [1, "x", 2, "y", 3]>; // [1, 2, 3]
```

### 1.2.2. Subpath Imports

You can also optionally import subpaths.

```ts
import $ from "hkt-toolbelt";
import { Filter } from "hkt-toolbelt/list";
import { Extends } from "hkt-toolbelt/conditional";

type FilterNum = Filter<Extends<number>>;
```

## 1.3 What is a HKT?

> **> HKT stands for "higher-kinded type"**

Typescript has two _different_ constructions: types, and generics.

- **type**: An compile-time expression that is used to describe a value.
- **generic**: A 'template' type that can be instantiated with one or more type arguments, and resolves to a type.

Generics are not first-class citizens in Typescript - you cannot reference them without immediately supplying all of their type arguments. You can't pass in generics as arguments to other generics, or return them. This is a limitation of the language.

**`hkt-toolbelt` introduces two additional constructions:**

- **kind**: A compile-time expression that is used to describe a type, and is parameterized such that it may be applied to an argument type.
- **generic kind**: A generic type that returns a kind.

We apply kinds to types using the `$<kind, type>` generic.

Using kinds allows us to represent new types that are not possible with generics alone. For example: the narrow composition of generic functions.

As well, for even types that are representible using generics, we can use kinds to provide a more ergonomic API and elegant implementation.

> **Note on Terminology**
> Technically, using the word **_kind_** like this is incorrect. However, always mentioning 'higher-kinded type' is cumbersome, so we use **'kind'** as shorthand.
>
> In some places we use 'hk-type' instead, which is more correct.

## 1.4. Guides

We have additional resources to help you get started with `hkt-toolbelt`, that go in depth on the concepts and usage.

- **[[Custom Kinds]](./docs/guides/custom-kinds.md)** - How do I create my own higher kinded types?
- **[[Kind Constraints]](./docs/guides/kind-constraints.md)** - How do I constrain a hk-type's input?
- **[[HK-Type Encoding]](./docs/guides/hk-type-encoding.md)** - Details on the internal encoding.

## 1.5. Similar Projects

- _Inspired by [ts-toolbelt](https://www.npmjs.com/package/ts-toolbelt)_
- _Awesome TS learning resource: [type-challenges](https://github.com/type-challenges/type-challenges)_
- _Value-level utilities: [lodash](https://lodash.com)_

## 1.6. Table of Contents

- [2. API](#2-api)
  - [2.1. Basic Utilities](#21-basic-utilities)
    - [2.1.1. $<F, X>](#211-f-x)
    - [2.1.2. $$<FX, X>](#212-fx-x)
    - [2.1.3. Cast<A, B>](#213-casta-b)
  - [2.2. Boolean Types](#22-boolean-types)
    - [2.2.1. Boolean.And\<X>](#221-booleanandx)
    - [2.2.2. Boolean.Or\<X>](#222-booleanorx)
    - [2.2.3. Boolean.Not](#223-booleannot)
  - [2.3. Combinator Types](#23-combinator-types)
    - [2.3.1. Combinator.Self](#231-combinatorself)
    - [2.3.2. Combinator.ApplySelf](#232-combinatorapplyself)
  - [2.4. Conditional Types](#24-conditional-types)
    - [2.4.1. Conditional.Equals\<A>](#241-conditionalequalsa)
    - [2.4.2. Conditional.Extends\<A>](#242-conditionalextendsa)
  - [2.5. Function Types](#25-function-types)
    - [2.5.1. Function](#251-function)
    - [2.5.2. Function.Constant\<A>](#252-functionconstanta)
    - [2.5.3. Function.Identity](#253-functionidentity)
  - [2.6. Kind Types](#26-kind-types)
    - [2.6.1. Kind\<F>](#261-kindf)
    - [2.6.2. Kind.Composable\<FX>](#262-kindcomposablefx)
    - [2.6.3. Kind.Compose\<FX>](#263-kindcomposefx)
    - [2.6.4. Kind.Pipe\<FX>](#264-kindpipefx)
    - [2.6.5. Kind.\_](#265-kind_)
  - [2.7. List Types](#27-list-types)
    - [2.7.1. List.Map\<F>](#271-listmapf)
    - [2.7.2. List.Find\<F>](#272-listfindf)
    - [2.7.3. List.Filter\<F>](#273-listfilterf)
    - [2.7.4. List.Append\<F>](#274-listappendf)
    - [2.7.5. List.First\<T>](#275-listfirstt)
    - [2.7.6. List.Last\<T>](#276-listlastt)
    - [2.7.7. List.Pair\<T>](#277-listpairt)
    - [2.7.8. List.Every\<T>](#278-listeveryt)
    - [2.7.9. List.Some\<T>](#279-listsomet)
    - [2.7.10. List.Reverse\<T>](#2710-listreverset)
    - [2.7.11. List.IsVariadic](#2711-listisvariadic)
  - [2.8. String Types](#28-string-types)
    - [2.8.1. String.StartsWith\<S>](#281-stringstartswiths)
    - [2.8.2. String.EndsWith\<S>](#282-stringendswiths)
    - [2.8.3. String.Includes\<S>](#283-stringincludess)
    - [2.8.4. String.Append\<S>](#284-stringappends)
    - [2.8.5. String.Prepend\<S>](#285-stringprepends)
    - [2.8.6. String.IsTemplate](#286-stringistemplate)
    - [2.8.7. String.Join\<S>](#287-stringjoins)
    - [2.8.8. String.Split\<S>](#288-stringsplits)
    - [2.8.9. String.First](#289-stringfirst)
    - [2.8.10. String.Last](#2810-stringlast)
    - [2.8.11. String.Tail](#2811-stringtail)
    - [2.8.12. String.Init](#2812-stringinit)
    - [2.8.13. String.Replace\<From, To>](#2813-stringreplacefrom-to)
    - [2.8.14. String.Reverse](#2814-stringreverse)

# 2. API

The curried nature of the functions in this library is intended to be utilized to compose types using point-free style. In this respect, API types will first take in 'operations' and then the data to be operated on.

All type functions (e.g. full Kinds) take in _one_ parameter at a time, to support currying and point-free style.

## 2.1. Basic Utilities

### 2.1.1. $<F, X>

The `$` operator is used to apply a higher-kinded-type function to a type. It is equivalent to the `F<A>` syntax in TypeScript.

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.Append<" world">, "hello">; // "hello world"
```

### 2.1.2. $$<FX, X>

The `$$` operator is used to apply a pipeline of kinds to a designated input type. This is a syntactic sugar for the `$` and `Kind.Pipe` operators, to avoid the need for explicitly calling `Kind.Pipe`.

`Kind.Pipe` composes kinds from left-to-right.

@see `$`
@see `Kind.Pipe`

```ts
import { $$, Kind, String } from "hkt-toolbelt";

type Result = $$<[String.Append<" world">, String.Append<"!">], "hello">; // "hello world!"
```

### 2.1.3. Cast<A, B>

The `Cast` type is used to cast a type to another type. It is equivalent to the `A as B` syntax in TypeScript. For subtle cases.

```ts
import { Cast } from "hkt-toolbelt";

type Result = Cast<"hello", string>; // "hello"
```

## 2.2. Boolean Types

### 2.2.1. Boolean.And\<X>

The `And` type takes in a boolean and returns a function that takes in another boolean and returns the result of the two booleans being `&&`'d together.

```ts
import $, { Boolean } from "hkt-toolbelt";

type Result = $<Boolean.And<true>, false>; // false
```

### 2.2.2. Boolean.Or\<X>

The `Or` type takes in a boolean and returns a function that takes in another boolean and returns the result of the two booleans being `||`'d together.

```ts
import $, { Boolean } from "hkt-toolbelt";

type Result = $<Boolean.Or<true>, false>; // true
```

### 2.2.3. Boolean.Not

The `Not` type takes in a boolean and returns the opposite boolean.

```ts
import $, { Boolean } from "hkt-toolbelt";

type Result = $<Boolean.Not, true>; // false
```

## 2.3. Combinator Types

### 2.3.1. Combinator.Self

The `Self` kind returns itself. This means it can be applied with $ infinitely.

```ts
import $, { Combinator } from "hkt-toolbelt";

type Result = $<$<Combinator.Self, "foo">, "foo">; // Combinator.Self
```

### 2.3.2. Combinator.ApplySelf

The `ApplySelf` kind takes in a kind, and applies that kind to itself. This can be used to create syntho-recursive kinds.

```ts
import $, { Combinator } from "hkt-toolbelt";

type Result = $<Combinator.ApplySelf, Function.Identity>; // Function.Identity
```

## 2.4. Conditional Types

### 2.4.1. Conditional.Equals\<A>

The `Equals` type is used to check if a type is equal to another type. It is equivalent to the `A extends B ? (B extends A ? true : false) : false` syntax in TypeScript.

`Equals` returns a higher-kinded-type function that takes a type and returns a boolean.

```ts
import $, { Conditional } from "hkt-toolbelt";

type Result = $<Conditional.Equals<"foo">, "bar">; // false
```

### 2.4.2. Conditional.Extends\<A>

The `Extends` type is used to check if a type is a subtype of another type. It is equivalent to the `A extends B ? true : false` syntax in TypeScript.

The first type passed in is the supertype, and the second type passed in is the subtype.

`Extends` returns a higher-kinded-type function that takes a type and returns a boolean.

```ts
import $, { Conditional } from "hkt-toolbelt";

type Result = $<Conditional.Extends<string>, "bar">; // true
```

## 2.5. Function Types

### 2.5.1. Function

The `Function` type is a supertype of all functions, i.e. all functions are a subtype of `Function`. It is not a kind and cannot be applied.

### 2.5.2. Function.Constant\<A>

The `Constant` type takes in a type and returns a function that takes in any type and returns the original type. It ignores its applied input and always returns the configured type.

```ts
import $, { Function } from "hkt-toolbelt";

type Result = $<Function.Constant<"foo">, number>; // "foo"
```

### 2.5.3. Function.Identity

The `Identity` type takes in a type and returns the same type, on the higher-kinded-type level.

```ts
import $, { Function } from "hkt-toolbelt";

type Result = $<Function.Identity, "foo">; // "foo"
```

## 2.6. Kind Types

### 2.6.1. Kind\<F>

The `Kind` type denotes a type function that may be applied to a type using `$`.

The Kind type can optionally be provided a function type to increase the specificity of its internal parameter and return types. This is used to create new kinds.

### 2.6.2. Kind.Composable\<FX>

The `Composable` type checks whether a tuple of kinds are composable. A tuple of kinds is composable if the output of kind $N$ is a subtype of the input of kind $N-1$.

```ts
import $, { Kind, String } from "hkt-toolbelt";

type Result = $<Kind.Composable, [String.Append<"bar">, String.Append<"foo">]>; // true
```

### 2.6.3. Kind.Compose\<FX>

The `Compose` type takes in a tuple of type functions, and composes them into one type function.

`Compose` checks that the tuple of kinds is composable, and returns a higher-kinded-type function that takes in a type and returns the result of the composition.

`Compose` executes functions from right to left, i.e. the last function in the tuple is executed first - as is traditional in mathematics.

```ts
import $, { Kind, String } from "hkt-toolbelt";

type Result = $<Kind.Compose<[String.Append<"bar">, String.Append<"foo">]>, "">; // "foobar"
```

### 2.6.4. Kind.Pipe\<FX>

The `Pipe` type takes in a tuple of type functions, and pipes them into one type function. This operates from left to right, i.e. the first function in the tuple is executed first. This is the opposite order of `Compose`.

`Pipe` is often more intuitive for programmers since it reads in order of execution. This is what `$$` uses internally.

```ts
import $, { Kind, String } from "hkt-toolbelt";

type Result = $<Kind.Pipe<[String.Append<"foo">, String.Append<"bar">]>, "">; // "foobar"
```

### 2.6.5. Kind.\_

The `_` type represents the 'unique placeholder type' used in type functions before application. `Kind._` is used by `$` for application.

## 2.7. List Types

### 2.7.1. List.Map\<F>

The `Map` function takes in a type function, and returns a higher kinded type that takes in a tuple type. It applies the given type function over every element in the tuple.

```ts
import $, { List, String } from "hkt-toolbelt";

type Result = $<List.Map<String.Append<"bar">>, ["foo", "baz"]>; // ["foobar", "bazbar"]
```

### 2.7.2. List.Find\<F>

The `Find` function takes in a type function, then a tuple, and returns the first tuple element for which the finder function returns `true`. If no such element exists, `Find` returns `never`.

```ts
import $, { List, String } from "hkt-toolbelt";

type Result = $<List.Find<String.StartsWith<"foo">>, ["bar", "foobar"]>; // "foobar"
```

### 2.7.3. List.Filter\<F>

The `Filter` function takes in a type function, and a tuple, and returns a tuple in-order of the input tuple, whereby only elements for which the filter function returns `true` remain in the resultant tuple.

```ts
import $, { List, String } from "hkt-toolbelt";

type Result = $<List.Filter<String.StartsWith<"foo">>, ["bar", "foobar"]>; // ["foobar"]
```

### 2.7.4. List.Append\<F>

The `Append` function takes in a type, and a tuple, and applies the type such that it is appended to the end of the provided tuple.

```ts
import $, { List } from "hkt-toolbelt";

type Result = $<List.Append<"bar">, ["foo", "baz"]>; // ["foo", "baz", "bar"]
```

### 2.7.5. List.First\<T>

The `First` function takes in a tuple, and returns the first element of the tuple.

```ts
import $, { List } from "hkt-toolbelt";

type Result = $<List.First, ["foo", "bar"]>; // "foo"
```

### 2.7.6. List.Last\<T>

The `Last` function takes in a tuple, and returns the last element of the tuple. In the case of tuples with variadic elements, the variadic element is properly handled, even if it's infix.

```ts
import $, { List } from "hkt-toolbelt";

type Result = $<List.Last, ["foo", "bar", "baz"]>; // "baz"
```

### 2.7.7. List.Pair\<T>

The `Pair` function takes in a tuple, and returns a tuple of tuples, where each tuple is a pair of the original tuple's elements, in order. e.g. `[1, 2, 3]` becomes `[[1, 2], [2, 3]]`.

```ts
import $, { List } from "hkt-toolbelt";

type Result = $<List.Pair, [1, 2, 3]>; // [[1, 2], [2, 3]]
```

For variadic tuples, the variadic element is handled via introducing unions to represent the possible combinations of variadic pair elements.

### 2.7.8. List.Every\<T>

The `Every` function takes in a predicate function, and a tuple, and returns `true` if every element in the tuple satisfies the predicate function, and `false` otherwise.

```ts
import $, { List, Conditional } from "hkt-toolbelt";

type Result = $<List.Every<Conditional.Extends<number>>, [1, 2, 3]>; // true
```

### 2.7.9. List.Some\<T>

The `Some` function takes in a predicate function, and a tuple, and returns `true` if at least one element in the tuple satisfies the predicate function, and `false` otherwise.

```ts
import $, { List, Conditional } from "hkt-toolbelt";

type Result = $<List.Some<Conditional.Extends<string>>, [1, 2, 3]>; // false
```

### 2.7.10. List.Reverse\<T>

The `Reverse` function takes in a tuple, and returns a tuple with the elements in reverse order.

This kind properly handles variadic tuple types, e.g. `[1, 2, ...string[]]` becomes `[...string[], 2, 1]`.

```ts
import $, { List } from "hkt-toolbelt";

type Result = $<List.Reverse, [1, 2, 3]>; // [3, 2, 1]
```

### 2.7.11. List.IsVariadic

The `IsVariadic` type takes in a tuple, and returns `true` if the tuple is variadic, and `false` otherwise.

We consider a tuple to be variadic if it has an indeterminate length.

```ts
import { List } from "hkt-toolbelt";

type Result = List.IsVariadic<[1, 2, 3]>; // false
```

## 2.8. String Types

### 2.8.1. String.StartsWith\<S>

The `StartsWith` function takes in a string literal and returns whether or not it starts with the given prefix, returning `true` or `false` as appropriate.

All strings _start with_ `string`, so `StartsWith<string>` will return true for all subsequent string types.

However, `string` starts with no particular prefix, so `$<StartsWith<"f">, string>` will result in false. All strings start with the empty string, as well.

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.StartsWith<"foo">, "foobar">; // true
```

### 2.8.2. String.EndsWith\<S>

The `EndsWith` function takes in a string literal and returns whether or not it ends with the given suffix, returning `true` or `false` as appropriate.

@see `String.StartsWith`

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.EndsWith<"bar">, "foobar">; // true
```

### 2.8.3. String.Includes\<S>

The `Includes` function takes in a string literal and returns whether or not it is a substring of the given string, returning `true` or `false` as appropriate.

@see `String.StartsWith`

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.Includes<"foo">, "barfoobar">; // true
```

### 2.8.4. String.Append\<S>

The `Append` function takes in a string literal and returns a higher-kinded-type function that takes in a string and returns the result of appending the string literal to the end of the string.

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.Append<"bar">, "foo">; // "foobar"
```

### 2.8.5. String.Prepend\<S>

The `Prepend` function takes in a string literal and returns a higher-kinded-type function that takes in a string and returns the result of prepending the string literal to the beginning of the string.

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.Prepend<"foo">, "bar">; // "foobar"
```

### 2.8.6. String.IsTemplate

The `IsTemplate` function takes in a string and returns whether or not it is a template literal, returning `true` or `false` as appropriate.

A string is considered to be a template literal if it cannot be reduced to a literal string, i.e. if it contains `${string}` within it.

This is a potentially expensive type operation.

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.IsTemplate, `foo${string}`>; // true
```

### 2.8.7. String.Join\<S>

The `Join` function takes in a string literal and returns a higher-kinded-type function that takes in a tuple of strings and returns the result of joining the strings in the tuple with the string literal acting as the separator.

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.Join<" ">, ["foo", "bar", "baz"]>; // "foo bar baz"
```

`Join` can handle template literal strings as well, and will properly handle the template literal's embedded expressions. In the case of variadic tuple input, we resolve the join to `string`. String unions are supported for both the separator and the tuple elements.

### 2.8.8. String.Split\<S>

The `Split` function takes in a string literal and returns a higher-kinded-type function that takes in a string and returns a tuple of strings, where the original string is split on the string literal.

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.Split<" ">, "foo bar baz">; // ["foo", "bar", "baz"]
```

`Split` can handle template literal strings as well, and will properly handle the template literal's embedded expressions. However, all string literal delimiters result in `string[]` as the split result. String unions are supported for both the separator and the tuple elements.

### 2.8.9. String.First

> **"If ya ain't `[First]`, you're `[Last]`"** - _Ricky Bobby_

The `First` function takes in a string and returns the first character of the string.

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.First, "foo">; // "f"
```

### 2.8.10. String.Last

The `Last` function takes in a string and returns the last character of the string.

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.Last, "foo">; // "o"
```

### 2.8.11. String.Tail

The `Tail` function takes in a string and returns the string with the first character removed.

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.Tail, "foobar">; // "oobar"
```

### 2.8.12. String.Init

The `Init` function takes in a string and returns the string with the last character removed.

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.Init, "foobar">; // "fooba"
```

### 2.8.13. String.Replace\<From, To>

The `Replace` generic, given two 'From' and 'To' types that represent a string to replace, and a string to replace it with, returns a higher-kinded-type that takes in a string and returns the result of replacing all instances of the 'From' string with the 'To' string.

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.Replace<"foo", "bar">, "foo foo foo">; // "bar bar bar"
```

### 2.8.14. String.Reverse

The `Reverse` function takes in a string and returns the string with the characters in reverse order.

```ts
import $, { String } from "hkt-toolbelt";

type Result = $<String.Reverse, "foobar">; // "raboof"
```

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

# API

The curried nature of the functions in this library is intended to be utilized to compose types using point-free style. In this respect, API types will first take in 'operations' and then the data to be operated on.

All type functions (e.g. full Kinds) take in _one_ parameter at a time, to support currying and point-free style.

## Basic Utilities

### $<F, A>

The `$` operator is used to apply a higher-kinded-type function to a type. It is equivalent to the `F<A>` syntax in TypeScript.

### Cast<A, B>

The `Cast` type is used to cast a type to another type. It is equivalent to the `A as B` syntax in TypeScript.

## Boolean Types

### Boolean.And\<A>

The `And` type takes in a boolean and returns a function that takes in another boolean and returns the result of the two booleans being `&&`'d together.

### Boolean.Not

The `Not` type takes in a boolean and returns the opposite boolean.

## Conditional Types

### Conditional.Equals\<A>

The `Equals` type is used to check if a type is equal to another type. It is equivalent to the `A extends B ? (B extends A ? true : false) : false` syntax in TypeScript.

`Equals` returns a higher-kinded-type function that takes a type and returns a boolean.

### Conditional.SubtypeOf\<A>

The `SubtypeOf` type is used to check if a type is a subtype of another type. It is equivalent to the `A extends B ? true : false` syntax in TypeScript.

`SubtypeOf` returns a higher-kinded-type function that takes a type and returns a boolean.

## Function Types

### Function

The `Function` type is a supertype of all functions, i.e. all functions are a subtype of `Function`.

### Function.Constant\<A>

The `Constant` type takes in a type and returns a function that takes in any type and returns the original type.

### Function.Identity

The `Identity` type takes in a type and returns the same type, on the higher-kinded-type level.

## Kind Types

### Kind\<F>

The `Kind` type denotes a type function that may be applied to a type using `$`.

The Kind type can optionally be provided a function type to increase the specificity of its internal parameter and return types.

### Kind.Composable\<FX>

The `Composable` type checks whether a tuple of kinds are composable. A tuple of kinds is composable if the output of kind N is a subtype of the input of kind N-1.

### Kind.Compose\<FX>

The `Compose` type takes in a tuple of type functions, and composes them into one type function.

`Compose` checks that the tuple of kinds is composable, and returns a higher-kinded-type function that takes in a type and returns the result of the composition.

### Kind.\_

The `_` type represents the 'placeholder variable' used in type functions before application.

## List Types

### List.Map\<F>

The `Map` function takes in a type function, and returns a higher kinded type that takes in a tuple type. It applies the given type function over every element in the tuple.

### List.Find\<F>

The `Find` function takes in a type function, then a tuple, and returns the first tuple element for which the finder function returns `true`. If no such element exists, `Find` returns `never`.

### List.Filter\<F>

The `Filter` function takes in a type function, and a tuple, and returns a tuple in-order of the input tuple, whereby only elements for which the filter function returns `true` remain in the resultant tuple.

### List.Append\<F>

The `Append` function takes in a type, and a tuple, and applies the type such that it is appended to the end of the provided tuple.

### List.Last\<T>

The `Last` function takes in a tuple, and returns the last element of the tuple. In the case of tuples with variadic elements, the variadic element is properly handled, even if it's infix.

### List.Pair\<T>

The `Pair` function takes in a tuple, and returns a tuple of tuples, where each tuple is a pair of the original tuple's elements, in order. e.g. `[1, 2, 3]` becomes `[[1, 2], [2, 3]]`.

For variadic tuples, the variadic element is handled via introducing unions to represent the possible combinations of variadic pair elements.

## String Types

### String.StartsWith\<S>

The `StartsWith` function takes in a string literal and returns whether or not it starts with the given prefix, returning `true` or `false` as appropriate.

All strings _start with_ `string`, so `StartsWith<string>` will return true for all subsequent string types.

However, `string` starts with no particular prefix, so `$<StartsWith<"f">, string>` will result in false. All strings start with the empty string, as well.

### String.EndsWith\<S>

The `EndsWith` function takes in a string literal and returns whether or not it ends with the given suffix, returning `true` or `false` as appropriate.

@see `String.StartsWith`

### String.Includes\<S>

The `Includes` function takes in a string literal and returns whether or not it is a substring of the given string, returning `true` or `false` as appropriate.

@see `String.StartsWith`

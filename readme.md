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
  - [Conditional Types](#conditional-types)
    - [Conditional.Equals\<A>](#conditionalequalsa)
    - [Conditional.SubtypeOf\<A>](#conditionalsubtypeofa)
  - [Function Types](#function-types)
    - [Function](#function)
  - [Kind Types](#kind-types)
    - [Kind](#kind)
    - [Kind.Compose](#kindcompose)
    - [Kind.\_](#kind_)
  - [List Types](#list-types)
    - [List.Map](#listmap)
    - [List.Find](#listfind)
    - [List.Filter](#listfilter)
  - [String Types](#string-types)
    - [String.StartsWith](#stringstartswith)
    - [String.EndsWith](#stringendswith)

# API

The curried nature of the functions in this library is intended to be utilized to compose types using point-free style. In this respect, API types will first take in 'operations' and then the data to be operated on.

## Basic Utilities

### $<F, A>

The `$` operator is used to apply a higher-kinded-type function to a type. It is equivalent to the `F<A>` syntax in TypeScript.

### Cast<A, B>

The `Cast` type is used to cast a type to another type. It is equivalent to the `A as B` syntax in TypeScript.

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

## Kind Types

### Kind

The `Kind` type denotes a type function that may be applied to a type using `$`.

### Kind.Compose

The `Compose` type takes in a tuple of type functions, and composes them into one type function.

### Kind.\_

The `_` type represents the 'placeholder variable' used in type functions before application.

## List Types

### List.Map

The `Map` function takes in a type function, and returns a higher kinded type that takes in a tuple type. It applies the given type function over every element in the tuple.

### List.Find

The `Find` function takes in a type function, then a tuple, and returns the first tuple element for which the finder function returns `true`. If no such element exists, `Find` returns `never`.

### List.Filter

The `Filter` function takes in a type function, and a tuple, and returns a tuple in-order of the input tuple, whereby only elements for which the filter function returns `true` remain in the resultant tuple.

## String Types

### String.StartsWith

The `StartsWith` function takes in a string literal and returns whether or not it starts with the given prefix, returning `true` or `false` as appropriate.

All strings _start with_ `string`, so `StartsWith<string>` will return true for all subsequent string types.

However, `string` starts with no particular prefix, so `$<StartsWith<"f">, string>` will result in false. All strings start with the empty string, as well.

### String.EndsWith

The `EndsWith` function takes in a string literal and returns whether or not it ends with the given suffix, returning `true` or `false` as appropriate.

@see `String.StartsWith`

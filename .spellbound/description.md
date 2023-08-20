# hkt-toolbelt

Functional and composable type utilities for TypeScript.

## Introduction

**hkt-toolbelt** provides a toolkit of types and utilities for doing type-level programming in TypeScript. It allows encoding data structures, logic, and computations at the type level in a functional style.
The core value proposition is enabling **expressive**, **reusable**, and **type-safe abstractions** through higher-kinded types and associated tools.

## Features

- **Higher-kinded types** - Model new abstractions using `Kind` and apply using `$`
- **Type arithmetic** - Encode numbers, strings, lists etc at the type level
- **Type operators** - Apply types cleanly with `$`, `$$`, and `$N` operators
- **Control flow** - Conditions, recursion, combinators for logic flow
- **Utils** - Rich libraries for `List`, `Object`, `String`, `Number` etc
- **Parsers** - Demonstrates stateful type-level programming
- **Composition** - Reuse, combine, and pipe type utilities together

## Getting Started

```sh
npm install hkt-toolbelt
```

```ts
import { $, String, List } from 'hkt-toolbelt'

// String manipulation 
type Foo = $<String.ToUpper, 'foo'> // 'FOO'

// List transformation
type Bar = $<List.Map<String.ToUpper>, ['foo', 'bar']> // ['FOO', 'BAR']
```

## Core Concepts

### Kinds

Kinds are reusable type-level functions modeled using `Kind`. Custom kinds encode new abstractions.

```ts
// Example 'Increment' kind 
type _$increment<N extends Number> = N + 1 // (simplified for demo)

interface Increment extends Kind {
  f(x: Number): _$increment<typeof x> 
}
```

### Application

The `$` operator allows applying kinds to arguments in a clean point-free style.

```ts
// Apply 'Increment' kind
type R = $<Increment, 1> // 2
```

### Composition

Kinds and native types can be easily composed into pipelines.

```ts
type R = $<List.Map<String.ToUpper>, ['foo', 'bar']>  
// ['FOO', 'BAR']
```

### Usage

hkt-toolbelt provides many utilities out of the box for common data types.

```ts
import { $, String, List, Object, Number, Parser } from 'hkt-toolbelt'

type S = $<String.ToLower, 'FOO'> // 'foo' 

type O = $<Object.Keys, {a: 1, b: 2}> // ['a', 'b']

type R = $<List.Filter<Number.IsEven>, [1, 2, 3, 4]> // [2, 4]

type P = $<Parser.Run, $<Parser.Letters>, 'hello'> // 'hello'
```

In addition to the in-built kinds, custom abstractions can be created to model domain-specific concepts in a reusable way.

## Why Use?

* Create readable, reusable abstractions
* Move logic out of runtime code into types
* Leverage compile-time computation
* Build pure, point-free pipelines
* Encode invariants and constraints

## Project Structure

Each module is defined under `src` - e.g. `./src/string/*`, `./src/list/*` etc. The `index.ts` file in each module exports the public API for that module. All source files, e.g. `./src/string/append.ts` has a corresponding spec file, e.g. `./src/string/append.spec.ts`.

Our goal is to have all utilities have ample tests, and to have all utilities JSDoc'd extensively, with examples.

Whenever you are implementing new utilities, tests, or documenting existing functionality, be sure to base your work on what already exists, and to use similar styles. For example, when you're writing tests, be sure to make it look and behave like the other tests in the project.

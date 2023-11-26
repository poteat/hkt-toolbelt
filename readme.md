<a href="https://github.com/poteat/hkt-toolbelt#readme">
  <img src=https://raw.githubusercontent.com/poteat/hkt-toolbelt/main/docs/logo.jpeg>
</a>

<br>
<br>

<p align="center">
  <a href="https://www.npmjs.com/package/hkt-toolbelt">
    <img src=https://img.shields.io/npm/v/hkt-toolbelt?color=green>
  </a>
  <img src=https://img.shields.io/github/actions/workflow/status/poteat/hkt-toolbelt/build.yml?branch=main>
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

**`hkt-toolbelt`** is a collection of type-level utilities that can be mapped and combined in functional ways using higher-kinded types.

Our composable and compile time-efficient types enable users to write expressive and readable type-level code without getting mired in complexity.

We support all of the type categories that you'll need (**List**, **Object**, **String**, **Union**, **Function**, **Boolean**, **Number**, and more), plus our very own **Kind** and **Combinator** utilities for composing types.

We're always adding new and exciting features, so stay tuned!

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

## What is a **`hkt`**?

> **`hkt`** stands for **"higher-kinded type"**

TypeScript has two distinct constructions: types, and generics.

- **Type**: A compile-time expression used to describe a value.
- **Generic**: A type "template" that resolves into a new type when instantiated with type arguments.

Generics are *not* first-class citizens in TypeScript: a) they can't be referenced without being supplied all of their type arguments, b) they can't be passed in as arguments to other generics, and c) they can't be returned by other generics. These were fundamental limitations of the TypeScript language ... until now.

**`hkt-toolbelt`** introduces two new constructions:

- **Kind**: A compile-time expression that is used to describe a type, and is parameterized so that it can be applied to an argument type.
- **Generic Kind**: A generic type that returns a kind (a.k.a. **"higher-kinded type"**).

> For convenience, we will use **"kind"** to refer to **"higher-kinded types"** as well.

Using kinds allows us to represent new types that cannot be expressed using generics alone. Even for types that *are* representable using generics, we can use kinds to provide a more ergonomic API and elegant implementation.

## Getting Started

### Install

```bash
> npm install hkt-toolbelt
> yarn add hkt-toolbelt
```

### Import

You can selectively import the kind categories that you need.

```ts
import { 
  $, $$, $N, 
  Boolean, Conditional, Function,
  List, Object, String, Union,
  Number, NaturalNumber,
  Kind, Type, Combinator, Parser,
} from "hkt-toolbelt";
```

You also have the option to load individual type utilities from subpaths.

```ts
import { $, $$, $N } from "hkt-toolbelt";
import { Map, Filter, Reduce } from "hkt-toolbelt/list";
import { Equals, Extends, If } from "hkt-toolbelt/conditional";
```

## Usage

### 1) `$`: Apply a Function to *an Argument*

> **`$<KIND, ARG>`**

The kind utilities in **`hkt-toolbelt`** are curried, unary type-level functions that can be applied to a single type argument using the `$` applicator.

```ts
import { $, Function, List } from "hkt-toolbelt";

type HelloWorld = $<$<List.Push, "world">, ["hello"]>;  // ["hello", "world"]

type OneTwoThree = $<
  $<List.Filter, $<Conditional.Extends, number>>,
  [1, "foo", 2, 3, "bar"]
>; // [1, 2, 3]
```

```js
// In javascript, this would be..
const helloWorld = ((arr) => [...arr, "world"])(["hello"]);

const oneTwoThree = ((arr) => arr.filter((e) => typeof e === "number"))([1, "foo", 2, 3, "bar"]);
```

### 2) `$N`: Pass *Multiple Arguments* into an uncurried Function

> **`$N<KIND, [ARG1, ARG2, ...]>`**

What if your function needs multiple arguments? Simply use the `$N` operator. Now you can supply arguments in order using a tuple, instead of heavily nested `$` calls.

```ts
import { $, $N, List, NaturalNumber } from "hkt-toolbelt";

// Example 1: full application (invoked with all three arguments)
type ReduceSum1to5 = $N<List.Reduce, [
  NaturalNumber.Add,  // callback
  0,                  // initial value
  [1, 2, 3, 4, 5]     // target array
]>;  // 15

// Example 2: partial application (invoked with only the first two arguments)
type ReduceSum = $N<List.Reduce, [NaturalNumber.Add, 0]>;

type ReduceSum1to5 = $<ReduceSum, [1, 2, 3, 4, 5]>;  // 15
type ReduceSum1to10 = $<ReduceSum, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]>;  // 55
```

```js
// In javascript, this would be..

// Example 1
const reduceSum1to5$N = [1, 2, 3, 4, 5].reduce((acc, curr) => acc + curr, 0);

// Example 2
const reduceSum = (arr) => arr.reduce((acc, curr) => acc + curr, 0);

const reduceSum1to5 = reduceSum([1, 2, 3, 4, 5]);
const reduceSum1to10 = reduceSum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
```

### 3) `$$`: Pipe an Argument through *Multiple Functions*

> **`$$<[KIND1, KIND2, ...], ARG>`**

What if you want to compose multiple functions over a single argument? This time, use the `$$` operator to supply the functions in order using a tuple.

```ts
import { $, $$, List, String } from "hkt-toolbelt";

type UnshiftPushJoin = $$<[
    $<List.Unshift, "first">,  // ["first", "second"]
    $<List.Push, "third">,     // ["first", "second", "third"]
    $<String.Join, ", ">,      // "first, second, third"
  ], ["second"]>;
```

```js
// In javascript, this would be..
const unshiftPushJoin = 
  ((arr) => arr.join(", "))(
    (((arr) => [...arr, "third"])(
      ((arr) => ["first", ...arr])(["second"])
  )));
```

## Documentation

For full documentation on all of the types included in this library, see: [https://majorlift.github.io/hkt-toolbelt/](https://majorlift.github.io/hkt-toolbelt/)

Note: The curried nature of the functions in this library is intended to be utilized to compose types using point-free style.

As a general principle, **`hkt-toolbelt`** types are written to first take in operations, and then the data to be operated on.

## Guides

We have additional resources to help you get started with **`hkt-toolbelt`**, that go in depth on the concepts and usage.

- **[[Custom Kinds]](./docs/guides/custom-kinds.md)** - How do I create my own higher-kinded types?
- **[[Kind Constraints]](./docs/guides/kind-constraints.md)** - How do I constrain a higher-kinded type's input?
- **[[HK-Type Encoding]](./docs/guides/hk-type-encoding.md)** - Details on the internal encoding.

## Similar Projects

- _Inspired by [ts-toolbelt](https://www.npmjs.com/package/ts-toolbelt)_
- _Awesome TS learning resource: [type-challenges](https://github.com/type-challenges/type-challenges)_
- _Value-level utilities: [lodash](https://lodash.com)_

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

<h1 align="center">
  <a href="https://github.com/poteat/hkt-toolbelt#readme.md">
  [Full API Docs]
  </a>
</h1>

---

## Getting Started

### Install

```bash
> npm install hkt-toolbelt
> yarn add hkt-toolbelt
```

### Import

```ts
import { 
  $, $$, $N, 
  Boolean, Conditional, Function,
  List, Object, String, Union,
  Number, Integer, NaturalNumber,
  Kind, Type, Combinator, Parser,
} from "hkt-toolbelt";
```

## Usage

### 1) `$`: Apply a Function to *an Argument*

> **`$<KIND, ARG>`**

```ts
import { $, List, Conditional } from "hkt-toolbelt";

type HelloWorld = $<$<List.Push, "world">, ["hello"]>;  // ["hello", "world"]

type OneTwoThree = $<
  $<List.Filter, $<Conditional.Extends, number>>,
  [1, "foo", 2, 3, "bar"]
>; // [1, 2, 3]
```

### 2) `$N`: Pass *Multiple Arguments* into an uncurried Function

> **`$N<KIND, [ARG1, ARG2, ...]>`**

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

### 3) `$$`: Pipe an Argument through *Multiple Functions*

> **`$$<[KIND1, KIND2, ...], ARG>`**

```ts
import { $, $$, List, String } from "hkt-toolbelt";

type UnshiftPushJoin = $$<[
    $<List.Unshift, "first">,  // ["first", "second"]
    $<List.Push, "third">,     // ["first", "second", "third"]
    $<String.Join, ", ">,      // "first, second, third"
  ], ["second"]>;
```

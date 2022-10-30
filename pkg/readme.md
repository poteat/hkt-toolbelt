<a href="https://github.com/poteat/hkt-toolbelt#readme">
  <img src=https://raw.githubusercontent.com/poteat/hkt-toolbelt/main/docs/logo.jpeg>
</a>

<br>
<br>

<p align="center">
  <img src=https://img.shields.io/npm/v/hkt-toolbelt?color=green>
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
  <i>A higher-kinded-type companion to ts-toolbelt</i>
</p>

---

This library is a companion to [ts-toolbelt](https://www.npmjs.com/package/ts-toolbelt) that provides higher-kinded-type versions of its functionality. This allows for more complex types to be constructed.

We aim to support hundreds of kind categories, including **List**, **Boolean**, **String**, **Function**, and more. We also provide a set of combinators for composing types.

<h1 align="center">
  <a href="https://github.com/poteat/hkt-toolbelt#readme.md">
  [Full API Docs]
  </a>
</h1>

---

## 1. Installation

```bash
> npm install hkt-toolbelt
```

## 2. Usage

```ts
import $, { List, Conditional } from "hkt-toolbelt";

type Result = $<
  List.Filter<Conditional.Extends<number>>,
  [1, "foo", 2, 3, "bar"]
>; // [1, 2, 3]
```

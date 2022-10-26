## [Higher-Kinded-Type Toolbelt]

_A higher-kinded-type companion to ts-toolbelt._

# [[Full API Docs]](https://github.com/poteat/hkt-toolbelt#readme.md)

## 1.1. Installation

```bash
npm install hkt-toolbelt
```

## 1.2. Usage

```ts
import $, { List, Conditional } from "hkt-toolbelt";

// A kind that filters to find numbers.
type FilterNumbers = List.Filter<Conditional.SubtypeOf<number>>;

type Result = $<FilterNumbers, [1, null, 2, 3, "4"]>; // [1, 2, 3]
```

### 1.2.1. Subpath Imports

You can also optionally import subpaths.

```ts
import $ from "hkt-toolbelt";
import { Filter } from "hkt-toolbelt/list";
import { SubtypeOf } from "hkt-toolbelt/conditional";

type FilterNumbers = Filter<SubtypeOf<number>>;

type Result = $<FilterNumbers, [1, null, 2, 3, "4"]>; // [1, 2, 3]
```

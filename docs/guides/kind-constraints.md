<a href="https://github.com/poteat/hkt-toolbelt#readme">
  <img src=https://raw.githubusercontent.com/poteat/hkt-toolbelt/main/docs/logo.jpeg>
</a>

<br>
<br>

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
  <i>A higher-kinded-type companion to ts-toolbelt</i>
</p>

---

# [Guide]: Kind Constraints

Kinds may be embedded with constraints that are enforced at compile-time. This is useful for ensuring that a Kind is applied with a specific type, or that a Kind is applied with a type that satisfies a certain predicate.

## Input Constraints

Input constraints are enforced by the `Type._$cast` type. `Type._$cast` is a generic that takes in a type and a constraint type.

```ts
import { Kind, Type } from "hkt-toolbelt";

interface MyKind extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], string>
  ): typeof x;
}
```

Here, we specify that `MyKind` _must_ be applied with a `string` type. If we try to apply it with a different type, we get a compile-time error:

```ts
// @ts-expect-error
type Result = $<MyKind, 1>; // Type '1' is not assignable to type 'string'
```

## Kind Input Constraints

Kinds can take in kinds. This is useful for defining a kind that takes in a kind that satisfies a certain predicate. However - can we specify that a kind can only take in kinds, which themselves only take in strings?

```ts
import { Kind, Type } from "hkt-toolbelt";

interface MyKind extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind<(x: string) => unknown>
  ): typeof x;
}
```

As defined above, this is totally possible to encode, such that the following will emit an error (because the `And` type takes in boolean, not a string).

```ts
// @ts-expect-error
type Result = $<MyKind, $<Boolean.And, true>>; // Type '$<Boolean.And, true>' does not satisfy the constraint 'Kind<(x: string) => unknown>'.
```

## Kind Output Constraints

Finally, we can also specify that a kind can only be applied to a _kind_ that outputs a particular type.

```ts
import { Kind, Type } from "hkt-toolbelt";

interface MyKind extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind<(x: never) => string>
  ): typeof x;
}
```

The `never` type in the function parameter type specifies that we don't care what the input type is, as long as the output type is a string.

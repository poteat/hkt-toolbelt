<h1 align="center">
  [HK-Types Toolbelt]
</h1>

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

# [Guide]: Custom Kinds

If the API does not provide a feature, defining a custom Kind in your application logic is somewhat straight-forward. As an example, let's define a Kind that takes in an object and omits all non-string values.

The approach is usually to define the type first using a generic, and then 'wrap' it in a kind construction.

```ts
type OmitNonStrings<O extends Record<string, unknown>> = {
  [key in keyof O as O[key] extends string ? key : never]: O[key];
};

type Result = OmitNonStrings<{ foo: number; bar: string }>; // { bar: string }
```

After `OmitNonStrings` is available, we can wrap it in a kind as follows:

```ts
import { Kind } from "hkt-toolbelt";

declare abstract class OmitNonStringsKind extends Kind {
  abstract f: (
    x: Cast<this[Kind._], Record<string, unknown>>
  ) => OmitNonStrings<typeof x>;
}
```

The `Cast` parameter _enforces_ that this kind _must_ be applied with a subtype of `Record<string, unknown>`. This is a useful pattern for ensuring that the kind is applied correctly.

Now that `OmitNonStringsKind` is available, we can use it in kind combinators like `List.Map` to map over a tuple of object types.

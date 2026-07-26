---
name: hkt-util
description: Author a new hkt-toolbelt utility from a description of its behaviour, or convert an existing runtime function into a type-level kind. Covers the whole path — `_$` base type, curried kind chain via scaffolding/generate-kind.ts, barrel wiring, and Test.Expect witnesses — and refuses conversions whose data domain or effects have no type-level encoding rather than emitting a plausible-looking type that silently disagrees with the function it mirrors. Triggers on /hkt-util, "add a utility for X", "new kind for X", "convert this function to type-level", "type-level version of this".
---

# hkt-util

Two modes over one procedure.

- **From a description** — the behaviour is stated in prose; write the base type.
- **From a runtime function** — the behaviour already exists in code; run the
  convertibility gate, then translate. A conversion that passes the gate is
  just the first mode with the base type's shape already decided.

## Convertibility gate

Run this before writing anything in the second mode. The type level has no
floating-point numbers, no effects, and no reference identity, so some functions
have no faithful encoding at all. **A wrong-but-plausible type is worse than a
refusal**, because it typechecks and then silently disagrees with the function it
claims to mirror.

Translates:

| Runtime construct | Type-level counterpart |
| --- | --- |
| `Math`, `String.prototype`, `Array.prototype` calls | The corresponding `Number`, `String`, `List` utilities |
| Integer arithmetic, modulo, parity | `NaturalNumber` and `Integer` utilities |
| A loop accumulating a result | Structural recursion with an accumulator generic, as in `_$replace` |
| A callback parameter | A `Kind.Kind` generic, applied with `$` |
| Parsing a string | `Parser` combinators over template literal types |

Refuse, naming the specific construct:

| Runtime construct | Why |
| --- | --- |
| Floating-point arithmetic, `NaN`, `Infinity` | Numbers are digit-encoded; there is no float representation |
| File, network, `Date.now`, randomness | Types cannot perform effects |
| Mutable shared state, object identity | The type level is structural — two structurally equal types *are* the same type |

Offer the nearest encodable neighbour when one exists (an integer square root
rather than a floating-point one). Recursion over caller-supplied input is
allowed but worth noting, since deep instantiation can exceed the compiler's
limits and may warrant a `.stress.spec.ts`.

These rows are design analysis rather than tested claims — only the first row is
exercised by the worked example below.

## Procedure

1. **Read the nearest neighbour.** Find the closest existing utility in the
   target module (`ls src/<module>/`) and read it with its test. Where it
   disagrees with anything here, follow the neighbour.
2. **Write the `_$` base type.** Name it `_$` plus the utility's name with only
   its first character lowercased — `PadEnd` becomes `_$padEnd`, `HTTPKind`
   becomes `_$hTTPKind`. Constrain every generic with a meaningful domain, and
   compose existing utilities rather than reimplementing them.
3. **Generate the curried chain** instead of hand-writing it:
   ```sh
   npx ts-node scaffolding/generate-kind.ts <Name> <arity> [constraint ...]
   ```
   One constraint per argument, positional, written as it would appear after
   `extends`; omit them all to bound everything by `unknown`. Each becomes both
   the type parameter's bound and that step's `Type._$cast` target.
4. **Rename the generated type parameters** from `X1`, `X2`, ... to the semantic
   names the module's neighbours use (`N`, `C`, `S`).
5. **Add the reified value** where neighbours carry one —
   `export const camelName = ((...) => ...) as Kind._$reify<Name>`. Not
   universal: `String.PadEnd` has one, `Number.Min` does not.
6. **Wire the barrel** — `export * from './<file>'` in the module's `index.ts`,
   in alphabetical position.
7. **Write witnesses**, respecting the file-suffix split:
   - `.test.ts` — run by jest; runtime `it()` cases against the reified value,
     plus a type-level `<Name>_Spec` tuple.
   - `.spec.ts` — type-only, compiled by `tsconfig.spec.json`, never executed.
   - `.stress.spec.ts` — depth and scale cases, `tsconfig.stress.json`.

   Each `Test.Expect` pairs a concrete input with a concrete expected output.
   When converting, take those pairs from what the runtime function actually
   returns. **Confirm they bite**: flip one expectation, confirm the compile
   fails, flip it back. An assertion that cannot fail proves nothing.
8. **Verify** with `npm test` and `npm run lint-check`. JSDoc follows
   `style-guide/jsdoc.md`.

## Worked example

Verified end to end — every type below compiles against the library and every
witness holds.

```ts
const clamp = (lo: number, hi: number) => (x: number) =>
  Math.min(hi, Math.max(lo, x))
```

`Math.min` and `Math.max` have counterparts in `Number`, so the gate passes:

```ts
import { Number } from '..'

export type _$clamp<
  LO extends Number.Number,
  HI extends Number.Number,
  X extends Number.Number
> = Number._$min<HI, Number._$max<LO, X>>
```

Chain from `generate-kind Clamp 3 'Number.Number' 'Number.Number' 'Number.Number'`,
then witnesses taken from what `clamp(0, 10)` actually returns:

```ts
type Clamp_Spec = [
  /**
   * A value above the upper bound is clamped down to it.
   */
  Test.Expect<$<$<$<Clamp, 0>, 10>, 15>, 10>,

  /**
   * A value below the lower bound is clamped up to it.
   */
  Test.Expect<$<$<$<Clamp, 0>, 10>, -3>, 0>,

  /**
   * A value already within the bounds is returned unchanged.
   */
  Test.Expect<$<$<$<Clamp, 0>, 10>, 7>, 7>
]
```

Starting from prose instead, the same procedure composes what already exists:

```ts
import { $, String } from '..'

export type _$isPalindrome<S extends string> =
  $<String.Reverse, S> extends S ? true : false
```

And a refusal, which is a complete answer rather than a failure:

```ts
const jitter = (x: number) => x + Math.random()
```

`Math.random` cannot be encoded. Types are pure, so there is no type-level
source of randomness and no type can differ between two instantiations with the
same arguments. If a deterministic offset would do, `NaturalNumber.Add`
expresses that instead.

## Related

- `scaffolding/generate-kind.ts` — emits the curried chain; its tests show the
  chain compiled and behaviour-checked against real kinds.
- `prompts/make-kind.md`, `make-spec.md`, `make-doc.md` — the single-shot prompt
  templates this procedure overlaps; `make-kind` predates the generator.
- `style-guide/jsdoc.md`, `style-guide/tests.md`.

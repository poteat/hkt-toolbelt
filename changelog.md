# Changelog

## 0.4.1

- Fix internal import paths and build process for package types.

## 0.4.0

- Added shorthand `$$` pipe-application operator.
- Added `Boolean.Or` for `||` HKT-level operator.
- Added `Combinator.Self` and `Combinator.ApplySelf` combinators.
- Added `Kind.Pipe` left-to-right composition.
- Added `List.First`, `List.Some`, `List.Reverse` tuple utilities.
- Improve `Test.Expect` error messages to use ᛰ for strict type equality.

## 0.3.0

- Added `String.Append` and `String.Prepend` types.
- Improved `Test.Expect` behavior and error messages.

## 0.2.1

- Renamed `Kind.Input` to `Kind.InputOf` and `Kind.Output` to `Kind.OutputOf`.

## 0.2.0

- Added HKT-level composability check for `Kind.Compose`.

## 0.1.0

- First experimental release.
- Introduced `Boolean`, `Cast`, `Conditional`, `Function`, `Kind`, `List`, `String`, and `Test` core components.

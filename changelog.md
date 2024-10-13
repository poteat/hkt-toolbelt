# Changelog

## [0.24.11]

- Reify `String.ToList` to a value-level function.
- Add `List.FindIndex` to find the index of a value in a list that satisfies a predicate.
- Add `List.IndexOf` to find the index of a value in a list.
- Add `List.StartsWith` to check if a list starts with a sequence of values.
- Add `List.EndsWith` to check if a list ends with a sequence of values.
- Add `List.IndexOfSequence` to find the index of a sequence of values in a list.
- Fix runtime list search utilities to search via deep equality.
- Add `List.Replace` to replace all instances of a value in a list with another value.
- Add `List.Remove` to remove all instances of a value from a list.
- Add `List.ReplaceSequence` to replace all instances of a sequence of values in a list with another sequence.
- Add `List.RemoveSequence` to remove all instances of a sequence of values from a list.
- Fix `NaturalNumber.decrement` to return zero when decrementing zero during runtime.
- Add `Combinator.Fix` to find a fixed point of a higher-order type.
- Reify `List.MinBy` to a value-level function.
- Add `List.MaxIndexBy` to find the index of the maximum element in a list according to a scoring function.
- Add `List.MinIndexBy` to find the index of the minimum element in a list according to a scoring function.
- Add `List.RemoveIndex` to remove an element at a specified index from a list.
- Reify `List.Reduce` to a value-level function.

## [0.24.10]

- Add `String.CamelCase` to convert a string to camelCase.
- Add `String.PascalCase` to convert a string to PascalCase.
- Add `String.SnakeCase` to convert a string to snake_case.
- Add `String.KebabCase` to convert a string to kebab-case.
- Add `String.ConstantCase` to convert a string to CONSTANT_CASE.
- Reify `String.Capitalize` to a value-level function.
- Add `String.Words` to split a string into words.
- Add `String.IsUppercaseLetter` to check if a string is uppercase.
- Add `String.IsLowercaseLetter` to check if a string is lowercase.
- Add `String.IsDigit` to check if a string is a digit.

## [0.24.9]

- Reify `NaturalNumber.Add` to a value-level function.
- Add `Kind.JuxtN` to juxt kinds with an arity of greater than one.
- Add `NaturalNumber.FromHex` to convert a hexadecimal string to a decimal number.
- Add `NaturalNumber.ToHex` to convert a decimal number to a hexadecimal string.
- Reify `String.FromList` to a value-level function.
- Add `List.PadStart` to pad a list to a desired length with a padding value.
- Add `List.PadEnd` to pad a list to a desired length with a padding value.
- Add `String.PadStart` to pad a string to a desired length with a padding character.
- Add `String.PadEnd` to pad a string to a desired length with a padding character.
- Improve inference efficiency of `List.Collate` and `Kind.LazyPipe`.

## [0.24.8]

- Add `List.Count` to create a frequency map from a list.
- Add `List.Same` to check if all elements in a list are equal.
- Add `Object.AtPathInObject` to get the value at a path in an object.
- Reify `Object.AtPath` to a value-level function.
- Add `Object.Defaults` to initialize an object with default values.
- Add `Object.Omit` to remove keys from an object.
- Add `Object.Pick` to pick keys from an object.
- Reify `Object.Values` to a value-level function.
- Reify `List.Slice` and `List.Splice` to value-level functions.
- Add arg-swapped `List.SliceList` and `List.SpliceList` utilities.
- Add `List.Entries` to get the entries of a list as a list of 2-tuples.
- Add `String.Entries` to get the entries of a string as a list of 2-tuples.
- Add `Kind.Collapse` to convert an n-arity kind to a 1-arity kind.

## [0.24.7]

- Add `NaturalNumber.Digits` to get the digits of a natural number.
- Add `List.Of` to create a list containing a single value.
- Add `List.SlidingWindow` to slide a window of a certain length over a list.
- Reify various natural number utilities.
- Reify various string and list utilities.
- Fix statefulness bug in reified `List.collate`.

## [0.24.6]
- Add `String.FromCharCode` to convert a character code to a string.
- Add `String.IsLetter` to check if a string is a letter.
- Add `String.ToCharCode` to convert a string to a character code.
- Reify `String.Split` to a value-level function.
- Reify `String.ToLower` to a value-level function.
- Reify `NaturalNumber.SubtractBy` to a value-level function.
- Reify `NaturalNumber.Subtract` to a value-level function.
- Reify `List.Filter` to a value-level function.

## [0.24.5]
- Add `NaturalNumber.Square` to compute the square of a natural number.
- Add `Object.AtKey` to get the value at a key in an object. (swapped argument order of `Object.At`)
- Modify `Conditional.equals` to perform deep equality.
- Add various value-level implementations.

## [0.24.4]
- Add various value-level implementations across `List`, `NaturalNumber`, `String`, and `Type`.
- Add `Type.Never` to represent the `never` type.

## [0.24.3]

- Add `List.IsEmpty` to check if a list is empty.
- Add `List.Take` to take the first N elements of a list.
- Add `List.TransformAt` to transform the element at a given index in a list.
- Add `List.UnshiftValue` to unshift a value onto a list.
- Add `Kind.LazyPipe` to apply a list of kinds lazily, i.e. allow intermediate currying.
- Add `Boolean.ToNumber` to convert a boolean to a number, i.e. 1 or 0.
- Modify `List.At` to return the union of all elements in a list if given `number` as an index.

## [0.24.2]

- Fix `List.CountBy` to gracefully handle variadics.

## [0.24.1]

- Add `List.CountBy` to count the number of elements in a list that satisfy a predicate.
- Add `Object.Entries` to get the entries of an object.
- Add `Object.Assign` to assign a value to a key in an object.
- Add `List.MaxBy` and `List.MinBy` to find the maximum or minimum element in a list that satisfies a predicate.
- Add various value-level implementations.

## [0.24.0]

- Add various `Kind` utilities:
  - Add `Kind.Juxt` for performing multiple calculations on a single input.
  - Add `Kind.PipeWeak` for a more flexible pipe operation with less checks.
- Add various `List` utilities:
  - Add `List.Chunk` for chunking lists into specified sizes of sublists.
  - Add `List.Duplicates` to identify duplicate values in a list.
  - Add `List.FlatMap` that maps over a kind and flattens the result one level.
  - Add `List.IncludesValue` as an argument swap of `List.Includes`.
  - Add `List.Intersect` to get common elements between two lists.
  - Add `List.PushValue` as an argument swap of `List.Push`.
  - Add `List.Remove` to filter out every instance of a value from a list.
  - Add `List.Unique` to return a list with all duplicate elements removed.
- Add new `Loop` module with an initial `Loop.Until` utility.
- Add new `Matrix` module for dealing with two-dimensional arrays:
  - Add `Matrix.Chunk` to chunk a matrix into a list of matrices.
  - Add `Matrix.Columns` to get the columns of a matrix.
  - Add `Matrix.Combine` to combine to merge a matrix of matrices into a single matrix.
  - Add `Matrix.Rows` to get the rows of a matrix.
  - Add `Matrix.Slice` to slice a matrix to get a submatrix using four indices.
- Add new `Type` utilities for intersection and union types:
  - Add `Type.Intersect` to get the intersection of two types.
  - Add `Type.Union` to get the union of two types.
  - Add `Type.IntersectAll` to get the intersection of all types in a tuple.
  - Add `Type.UnionAll` to get the union of all types in a tuple.
- Add various `Object` utilities for object manipulation.
- **[Breaking]** Swap argument order of `List.Repeat` to match documentation.
- **[Breaking]** Change `List.Includes` to take in direct value (since `List.Some` already exists).

## [0.23.1]

- Add `Type.Assert` utility for strict type assertions.

## [0.23.0]

- Add support for TypeScript v5.4.2.
- Improve performance for division-based operations.
- Add `DigitList._$signedAdd`, for efficient signed addition using digit lists.
- **[Breaking]** Improve `List.Range` edge case semantics.

## [0.22.2]

- Add additional JSDoc annotations for some modules. (`Union`, `Type`, `Kind`)

## [0.22.1]

- Add `String.Capitalize` utility for capitalizing the first letter of a string.

## [0.22.0]

- Add various conditional 'variadic' utilities:
  - Add `Conditional.EqualsAll` for checking if every type in a list is equal.
  - Add `Conditional.ExtendsAll` for performing composite subtype checks.
- Add `Union.FromList` for constructing a union from a list of types.
- Add list utilities:
  - Add `List.At`, `List.Accumulate`, `List.Iterate`, `List.Zip`.
  - Add `List.Range`, for generating ranges of numbers.
- Add various number utilities:
  - Add `Number.Negate` for integer negation.
  - Add `Number.Max` and `Number.Min` for binary max/min operations.
  - Add `Number.MAX_SAFE_INTEGER` and `Number.MIN_SAFE_INTEGER` constants.
- Add `NaturalNumber.SubtractBy` for argument-swapped subtraction.
- **[Breaking]** Improve `List.Slice`, `List.Splice`, and `List.Unshift` interfaces.

## [0.21.1]

- Add support for negative start indices in `List.Splice`.

## [0.21.0]

- Improve ability to compose type-level functions
  - Add `$N` operator for uncurried type-level function application.
  - Add `Kind.Curry` and `Kind.Uncurry` to support argument lifting.
- Add various natural number operations:
  - Add `NaturalNumber.ModuloBy` with swapped arguments.
  - Add `NaturalNumber.IsLessThan`.
- Add `Combinator.Collate` for theoretical / pedagogical purposes.
- Add `NaturalNumberTheory.Factorial`.
- Add `NaturalNumberTheory.FizzBuzz` and `NaturalNumberTheory.FizzBuzzSequence`.

## [0.20.1]

- Add `DigitList.FromString` for parsing digit lists from strings.
- Add `Number.Compare` for type-level numeric comparison.

## [0.20.0]

- Add various advanced `List` methods.
  - Add `Concat`, `Repeat`, `ShiftN`, `PopN`, `Slice`, `Splice`, `Flatten`
  - Add `FlattenN`, `DigitList.ToNumber`
- **[Breaking]** Rename prior `List.Slice` utility to `List.ShiftN`.

## [0.19.3]

- Make `String.Join` more composable with other list types.

## [0.19.2]

- Improve `NaturalNumber.Multiply` and `Combinator.FixSequence` performance.

## [0.19.1]

- Add `Kind.Reify` for reifying a higher-order type to a value-level type.
- Add `Type.Infer` for inferring a narrow type in a parameter context.

## [0.19.0]

- **[Breaking]** Complete overhaul of all modules, more consistent `$` usage.

## [0.18.1]

- Add `NaturalNumber.Compare` for comparing natural numbers.

## [0.18.0]

- Add various numeric comparison types.
  - Add `DigitList.Compare` for comparing digit list magnitude.
  - Add `Digit.Compare` for comparing single-digit magnitude.
- Add various parser combinators.
  - Add `Parser.Many1` for parsing one or more elements.
  - Add `Parser.Optional` for parsing an optional element.
- Introduce `Stress` module for common stress-testing types.

## [0.17.1]

- Introduce various other `Parser` combinators.
  - Add `Parser.Run` for state management.
  - Add `Parser.Map` for mapping over the result of a parser.
  - Add `Parser.Letter` and `Parser.Letters` for parsing letters.
  - Add `Parser.ObjectSequence` for better result extraction.
- Add `Object.Emplace` and `Object.Merge` methods.
- Increase performance of various string and list utilities.

## [0.17.0]

- Introduce `Parser` module for parser combinators.
  - Add `Parser.String` for parsing string literals.
  - Add `Parser.Choice` for parsing alternatives.
  - Add `Parser.Sequence` for parsing sequences.
- Add `List.Slice<N>` method, to remove the first N elements from a list.
- Add `String.Slice` method.

## [0.16.1]

- Fix division bug that led to rare incorrect results for
  `NaturalNumber.Divide`.

## [0.16.0]

- Introduce `NaturalNumberTheory` module for abstract natural number theory.
  - Add `NaturalNumberTheory.Collatz`
  - Add `NaturalNumberTheory.CollatzSequence` for generating hailstorm numbers.
- Add `Combinator.FixSequence` for fixed-point iteration of a sequence.
- Add `NaturalNumber.DivideBy`, for argument swapping of `NaturalNumber.Divide`.

## [0.15.1]

- Fix `String.Join` bug that did not properly handle one-tuple elements.

## [0.15.0]

- Add `List.Length` method.
- Add `List.Times` method, which constructs the tuple from 0 to N - 1.
- Add `NaturalNumber.Divide` and `NaturalNumber.Modulo` methods.
- Add `NaturalNumber.IsEven` and `NaturalNumber.IsOdd` methods.
- Add various digit-list level division methods.

## [0.14.0]

- Add `NaturalNumber.Multiply` method.
- **[Breaking]** Change return type of natural arithmetic to numbers instead of
  strings.

## [0.13.2]

- Add `NaturalNumber.Increment` and `NaturalNumber.Decrement` methods.
- Add `NaturalNumber.Subtract` method.

## [0.13.1]

- Add `List.Reduce` method.

## [0.13.0]

- Add `Number`, `NaturalNumber`, `Digit`, and `DigitList` modules.
- Add `Type.IsNever` method.
- Add `Union.Length` method.

## [0.12.0]

- **[Breaking]** Switch default package export from '$' to entire module.
- **[Breaking]** Remove deprecated `Conditional.SubtypeOf` in favor of
  `Conditional.Extends`.
- **[Breaking]** Remove `Kind` namespace-class merging in favor of `Kind.Kind`.
- Add support for deep subpath imports.
  - e.g. `import { StartsWith } from "hkt-toolbelt/string/starts-with"`

## [0.11.0]

- Add `String.ToUpper` and `String.ToLower` methods.
- Add `Object.MapKeys` and `Object.MapValues` methods.

## [0.10.0]

- Add `Conditional.If` hk-type for type-level control flow.
- Add `String.IsString` hk-level predicate.
- Add `Type`, `Union`, and `Object` core components.

## [0.9.0]

- Fix a type resolution issue for `Conditional.Extends` hk-type.
- Strengthen hk-level type check for `Combinator.ApplySelf` hk-type.
- Optimize string and list utilities via tail-call optimization.

## [0.8.1]

- Introduce `Conditional.Extends` utility type.
- Deprecate alias `Conditional.SubtypeOf` in favor of `Conditional.Extends`.

## [0.8.0]

- Add `String.Tail`, `String.Init`, and `String.Reverse` hk-types.

## [0.7.0]

- Optimize string splitting routine in `String.IsTemplate` using tail-call
  optimization.
- Add `String.First` and `String.Last` kinds.

## [0.6.1]

- Publish updated npm readme.

## [0.6.0]

- Add `String.Join`, `String.Split`, and `String.IsTemplate` kinds.
- Add `List.IsVariadic` kind.

## [0.5.1]

- Fix bug with `Test.Expect` in checking equality between two `never` types.
- Publish improved docs on npm.

## [0.5.0]

- Allow alternative subpath imports, e.g. `hkt-toolbelt/string`.

## [0.4.1]

- Fix internal import paths and build process for package types.

## [0.4.0]

- Add shorthand `$$` pipe-application operator.
- Add `Boolean.Or` for `||` HKT-level operator.
- Add `Combinator.Self` and `Combinator.ApplySelf` combinators.
- Add `Kind.Pipe` left-to-right composition.
- Add `List.First`, `List.Some`, `List.Reverse` tuple utilities.
- Improve `Test.Expect` error messages to use ᛰ for strict type equality.

## [0.3.0]

- Add `String.Append` and `String.Prepend` types.
- Improve `Test.Expect` behavior and error messages.

## [0.2.1]

- Rename `Kind.Input` to `Kind.InputOf` and `Kind.Output` to `Kind.OutputOf`.

## [0.2.0]

- Add HKT-level composability check for `Kind.Compose`.

## [0.1.0]

- First experimental release.
- Introduce `Boolean`, `Cast`, `Conditional`, `Function`, `Kind`, `List`,
  `String`, and `Test` core components.

[Unreleased]: https://github.com/poteat/hkt-toolbelt/compare/v0.22.2...HEAD
[0.22.2]: https://github.com/poteat/hkt-toolbelt/compare/v0.22.1...v0.22.2
[0.22.1]: https://github.com/poteat/hkt-toolbelt/compare/v0.22.0...v0.22.1
[0.22.0]: https://github.com/poteat/hkt-toolbelt/compare/v0.21.1...v0.22.0
[0.21.1]: https://github.com/poteat/hkt-toolbelt/compare/v0.21.0...v0.21.1
[0.21.0]: https://github.com/poteat/hkt-toolbelt/compare/v0.20.1...v0.21.0
[0.20.1]: https://github.com/poteat/hkt-toolbelt/compare/v0.20.0...v0.20.1
[0.20.0]: https://github.com/poteat/hkt-toolbelt/compare/v0.19.3...v0.20.0
[0.19.3]: https://github.com/poteat/hkt-toolbelt/compare/v0.19.2...v0.19.3
[0.19.2]: https://github.com/poteat/hkt-toolbelt/compare/v0.19.1...v0.19.2
[0.19.1]: https://github.com/poteat/hkt-toolbelt/compare/v0.19.0...v0.19.1
[0.19.0]: https://github.com/poteat/hkt-toolbelt/compare/v0.18.1...v0.19.0
[0.18.1]: https://github.com/poteat/hkt-toolbelt/compare/v0.18.0...v0.18.1
[0.18.0]: https://github.com/poteat/hkt-toolbelt/compare/v0.17.1...v0.18.0
[0.17.1]: https://github.com/poteat/hkt-toolbelt/compare/v0.17.0...v0.17.1
[0.17.0]: https://github.com/poteat/hkt-toolbelt/compare/v0.16.1...v0.17.0
[0.16.1]: https://github.com/poteat/hkt-toolbelt/compare/v0.16.0...v0.16.1
[0.16.0]: https://github.com/poteat/hkt-toolbelt/compare/v0.15.1...v0.16.0
[0.15.1]: https://github.com/poteat/hkt-toolbelt/compare/v0.15.0...v0.15.1
[0.15.0]: https://github.com/poteat/hkt-toolbelt/compare/v0.14.0...v0.15.0
[0.14.0]: https://github.com/poteat/hkt-toolbelt/compare/v0.13.2...v0.14.0
[0.13.2]: https://github.com/poteat/hkt-toolbelt/compare/v0.13.1...v0.13.2
[0.13.1]: https://github.com/poteat/hkt-toolbelt/compare/v0.13.0...v0.13.1
[0.13.0]: https://github.com/poteat/hkt-toolbelt/compare/v0.12.0...v0.13.0
[0.12.0]: https://github.com/poteat/hkt-toolbelt/compare/v0.11.0...v0.12.0
[0.11.0]: https://github.com/poteat/hkt-toolbelt/compare/v0.10.0...v0.11.0
[0.10.0]: https://github.com/poteat/hkt-toolbelt/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/poteat/hkt-toolbelt/compare/v0.8.1...v0.9.0
[0.8.1]: https://github.com/poteat/hkt-toolbelt/compare/v0.8.0...v0.8.1
[0.8.0]: https://github.com/poteat/hkt-toolbelt/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/poteat/hkt-toolbelt/compare/v0.6.1...v0.7.0
[0.6.1]: https://github.com/poteat/hkt-toolbelt/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/poteat/hkt-toolbelt/compare/v0.5.1...v0.6.0
[0.5.1]: https://github.com/poteat/hkt-toolbelt/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/poteat/hkt-toolbelt/compare/v0.4.1...v0.5.0
[0.4.1]: https://github.com/poteat/hkt-toolbelt/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/poteat/hkt-toolbelt/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/poteat/hkt-toolbelt/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/poteat/hkt-toolbelt/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/poteat/hkt-toolbelt/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/poteat/hkt-toolbelt/releases/tag/v0.1.0

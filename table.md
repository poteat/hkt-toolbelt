# Namespace List

| Namespace       | Description                                                                               |
| --------------- | ----------------------------------------------------------------------------------------- |
| `Boolean`       | Perform logical operations and comparisons on boolean types.                              |
| `Combinator`    | Apply various combinatory functions on types.                                             |
| `Conditional`   | Perform conditional checks and selections on types.                                       |
| `DigitList`     | Perform arithmetic operations and other transformations on digit lists.                   |
| `Function`      | Manipulate function types and their return types.                                         |
| `Kind`          | Apply, compose, or pipe higher-order types, and access input/output types.                |
| `List`          | Manipulate list types with various operations like map, filter, flatten, and concatenate. |
| `NaturalNumber` | Perform arithmetic operations and comparisons on natural number types.                    |
| `Object`        | Access and manipulate object types, including their keys and values.                      |
| `Parser`        | Compose and manipulate parser types that process string inputs.                           |
| `String`        | Perform various operations and transformations on string types.                           |
| `Test`          | Assert and test type equality or difference.                                              |
| `Type`          | Infer types, cast types, display types, and other type operations.                        |
| `Union`         | Convert, manipulate, and determine properties of union types.                             |

# Utility List

| Namespace       | Type                                              | Description                                                                     |
| --------------- | ------------------------------------------------- | ------------------------------------------------------------------------------- |
| `Boolean`       | `Not`                                             | Compute the complement of a boolean type.                                       |
| `Boolean`       | `And`, `Or`, `Nand`, `Nor`                        | Perform a logical operation on two boolean types.                               |
| `Boolean`       | `Imply`                                           | Compute the logical implication of two boolean types.                           |
| `Boolean`       | `Nimply`                                          | Compute the complement of the logical implication of two boolean types.         |
| `Boolean`       | `Xnor`                                            | Compute the equivalence of two boolean types.                                   |
| `Boolean`       | `Xor`                                             | Compute the exclusive OR of two boolean types.                                  |
| `Combinator`    | `ApplySelf`                                       | Apply a type to itself.                                                         |
| `Combinator`    | `Collate`                                         | Take a type number N, then N type arguments, and return a tuple of all N types. |
| `Combinator`    | `FixSequence`                                     | Take in a higher-order type and a value, and loop until a fixed point is found. |
| `Combinator`    | `RecursiveKind`                                   | Takes in its own type, and return `unknown`.                                    |
| `Combinator`    | `Self`                                            | Take in any type, and return the type `Self`.                                   |
| `Conditional`   | `Equals`                                          | Determine if two types are equal.                                               |
| `Conditional`   | `Extends`                                         | Check if a type is a subtype of another.                                        |
| `Conditional`   | `If`                                              | Select a type based on a condition.                                             |
| `Conditional`   | `NotEquals`                                       | Determine if two types are different.                                           |
| `DigitList`     | `Add`, `Subtract`, `Multiply`, `Divide`, `Modulo` | Perform an arithmetic operation on digit lists.                                 |
| `DigitList`     | `Increment`, `Decrement`                          | Increment or decrement a digit list.                                            |
| `DigitList`     | `IsEven`, `IsOdd`                                 | Check if a digit list is even or odd.                                           |
| `DigitList`     | `Compare`                                         | Compare two digit lists.                                                        |
| `DigitList`     | `First`, `Last`                                   | Get the first or last element of a digit list.                                  |
| `DigitList`     | `ToList`, `ToNumber`, `ToString`                  | Convert digit lists to an equivalent list of digits, number, or string.         |
| `Function`      | `Constant`                                        | Return a constant type.                                                         |
| `Function`      | `Identity`                                        | Return the input type as is.                                                    |
| `Function`      | `ReturnType`                                      | Get the return type of a function type.                                         |
| `Kind`          | `Apply`, `Compose`, `Pipe`                        | Apply, compose, or pipe higher-order types.                                     |
| `Kind`          | `OutputOf`                                        | Get the output type of a higher-order type.                                     |
| `Kind`          | `InputOf`                                         | Get the input type of a higher-order type.                                      |
| `List`          | `Concat`                                          | Concatenate two lists.                                                          |
| `List`          | `Every`, `Some`                                   | Check if all or some elements in a list satisfy a predicate.                    |
| `List`          | `Filter`                                          | Filter a list by a predicate.                                                   |
| `List`          | `Find`                                            | Find the first element in a list that satisfies a predicate.                    |
| `List`          | `First`, `Last`                                   | Get the first or last element of a list.                                        |
| `List`          | `Flatten`, `FlattenN`                             | Flatten nested lists.                                                           |
| `List`          | `Includes`                                        | Check if a list includes a given element.                                       |
| `List`          | `Length`                                          | Get the length of a list.                                                       |
| `List`          | `Map`                                             | Apply a higher-order type to each element in a list.                            |
| `List`          | `Reduce`                                          | Reduce a list to a single value using a higher-order type reducer.              |
| `List`          | `Reverse`                                         | Reverse a list.                                                                 |
| `List`          | `Slice`                                           | Slices a portion of a list.                                                     |
| `List`          | `Splice`                                          | Adds/removes elements to/from a list.                                           |
| `NaturalNumber` | `Add`, `Subtract`, `Multiply`, `Divide`, `Modulo` | Perform an arithmetic operation on natural numbers.                             |
| `NaturalNumber` | `Increment`, `Decrement`                          | Increment or decrement a natural number.                                        |
| `NaturalNumber` | `IsEven`, `IsOdd`, `IsLessThan`                   | Check parity/compare natural numbers.                                           |
| `Object`        | `AtPath`, `At`                                    | Access an object value at a given path or key.                                  |
| `Object`        | `DeepMapValues`                                   | Deep map over an object's values.                                               |
| `Object`        | `Emplace`                                         | Emplace new key-value pairs in an object.                                       |
| `Object`        | `Keys`, `Values`                                  | Get the keys or values of an object.                                            |
| `Object`        | `MapKeys`, `MapValues`                            | Map over the keys or values of an object.                                       |
| `Object`        | `Merge`                                           | Merge two objects into a new one.                                               |
| `Parser`        | `Choice`                                          | Select one of multiple alternative parsers.                                     |
| `Parser`        | `Letter`, `Letters`                               | Match single or multiple letters.                                               |
| `Parser`        | `Many1`, `Optional`                               | Combine parsers via repetition and optionality.                                 |
| `Parser`        | `Map`                                             | Apply a higher-order type to the result of a parser.                            |
| `Parser`        | `ObjectSequence`                                  | Parse a sequence into a resultant object type.                                  |
| `Parser`        | `Run`                                             | Execute a parser on an input string.                                            |
| `Parser`        | `Sequence`                                        | Parse a sequence of input elements.                                             |
| `Parser`        | `State`                                           | Represents the state of a parser.                                               |
| `Parser`        | `String`                                          | Match a specific given input string.                                            |
| `Parser`        | `TakeSequence`                                    | Specify a single parser sequence element to emit as its result.                 |
| `String`        | `Append`, `Prepend`                               | Append or prepend a character to a string.                                      |
| `String`        | `EndsWith`, `StartsWith`                          | Check if a string ends or starts with a given substring.                        |
| `String`        | `First`, `Last`                                   | Get the first or last character in a string.                                    |
| `String`        | `FromList`                                        | Convert a list of characters into a string.                                     |
| `String`        | `Includes`                                        | Check if a string includes a given substring.                                   |
| `String`        | `Init`, `Tail`                                    | Get the initial or tail part of a string.                                       |
| `String`        | `IsString`                                        | Determine if a type is a valid string type.                                     |
| `String`        | `IsTemplate`                                      | Determine if a type is a string with template parts.                            |
| `String`        | `Join`                                            | Join elements of a supplied list to create a string.                            |
| `String`        | `Length`                                          | Calculate the length of the input string type.                                  |
| `String`        | `Replace`                                         | Replace a substring in a string with another.                                   |
| `String`        | `Reverse`                                         | Reverse a string.                                                               |
| `String`        | `Slice`                                           | Slice a portion of a string.                                                    |
| `String`        | `Split`                                           | Split a string into a list.                                                     |
| `Test`          | `Expect`, `ExpectNot`                             | Assert that types are logically equal or not equal.                             |
| `Type`          | `Cast`                                            | Cast a type to conform to a narrowed type.                                      |
| `Type`          | `Display`                                         | Display the "computed type" of a generic.                                       |
| `Type`          | `Infer`                                           | Infer a given generic as a narrowed function parameter.                         |
| `Type`          | `IsNever`                                         | Determine if a type is the `never` type.                                        |
| `Type`          | `ValueOf`                                         | Get any values of a given tuple or object type.                                 |
| `Union`         | `Length`                                          | Compute the number of types in a union.                                         |
| `Union`         | `ToIntersection`                                  | Convert a union type to an intersection type.                                   |
| `Union`         | `ToList`                                          | Convert a union type to a list type with the same elements.                     |

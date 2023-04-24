| Namespace       | Type                                              | Description                                                              |
| --------------- | ------------------------------------------------- | ------------------------------------------------------------------------ |
| `Boolean`       | `Not`                                             | Computes the complement of a boolean type.                               |
| `Boolean`       | `And`, `Or`, `Nand`, `Nor`                        | Perform logical operations on two boolean types.                         |
| `Boolean`       | `Imply`                                           | Computes the logical implication of two boolean types.                   |
| `Boolean`       | `Nimply`                                          | Computes the complement of the logical implication of two boolean types. |
| `Boolean`       | `Xnor`                                            | Computes the equivalence of two boolean types.                           |
| `Boolean`       | `Xor`                                             | Computes the exclusive OR of two boolean types.                          |
| `Combinator`    | `ApplySelf`                                       | ???                                                                      |
| `Combinator`    | `Collate`                                         | ???                                                                      |
| `Combinator`    | `FixSequence`                                     | ???                                                                      |
| `Combinator`    | `RecursiveKind`                                   | ???                                                                      |
| `Combinator`    | `Self`                                            | ???                                                                      |
| `Conditional`   | `Equals`                                          | Determines if two types are equal.                                       |
| `Conditional`   | `Extends`                                         | Checks if a type is a subtype of another.                                |
| `Conditional`   | `If`                                              | Selects a type based on a condition.                                     |
| `Conditional`   | `NotEquals`                                       | Determines if two types are not equal.                                   |
| `DigitList`     | `Add`, `Subtract`, `Multiply`, `Divide`, `Modulo` | Perform arithmetic operations on digit lists.                            |
| `DigitList`     | `Increment`, `Decrement`                          | Increment or decrement a digit list.                                     |
| `DigitList`     | `IsEven`, `IsOdd`                                 | Check if a digit list is even or odd.                                    |
| `DigitList`     | `Compare`                                         | Compare two digit lists.                                                 |
| `DigitList`     | `First`, `Last`                                   | Get the first or last element of a digit list.                           |
| `DigitList`     | `ToList`, `ToNumber`, `ToString`                  | Convert digit lists to equivalent list of digits, number, or string.     |
| `Function`      | `Constant`                                        | Returns a constant value.                                                |
| `Function`      | `Identity`                                        | Returns the input value as is.                                           |
| `Function`      | `ReturnType`                                      | Gets the return type of a function type.                                 |
| `Kind`          | `Apply`, `Compose`, `Pipe`                        | Apply, compose, or pipe function kinds.                                  |
| `Kind`          | `OutputOf`                                        | Gets the output type of a kind.                                          |
| `Kind`          | `InputOf`                                         | Gets the input type of a kind.                                           |
| `List`          | `Concat`                                          | Concatenates two lists.                                                  |
| `List`          | `Every`, `Some`                                   | Check if all or some elements in a list satisfy a predicate.             |
| `List`          | `Filter`                                          | Filters a list by a predicate.                                           |
| `List`          | `Find`                                            | Find the first element in a list that satisfies a predicate.             |
| `List`          | `First`, `Last`                                   | Get the first or last element of a list.                                 |
| `List`          | `Flatten`, `FlattenN`                             | Flatten nested lists.                                                    |
| `List`          | `Includes`                                        | Checks if a list includes a given element.                               |
| `List`          | `Length`                                          | Gets the length of a list.                                               |
| `List`          | `Map`                                             | Applies a transformation to each element in a list.                      |
| `List`          | `Reduce`                                          | Reduces a list to a single value using a reducer.                        |
| `List`          | `Reverse`                                         | Reverses a list.                                                         |
| `List`          | `Slice`                                           | Slices a portion of a list.                                              |
| `List`          | `Splice`                                          | Adds/removes elements to/from a list.                                    |
| `NaturalNumber` | `Add`, `Subtract`, `Multiply`, `Divide`, `Modulo` | Perform arithmetic operations with natural numbers.                      |
| `NaturalNumber` | `Increment`, `Decrement`                          | Increment or decrement a natural number.                                 |
| `NaturalNumber` | `IsEven`, `IsOdd`, `IsLessThan`                   | Check parity/compare natural numbers.                                    |
| `Object`        | `AtPath`, `At`                                    | Access an object value at a given path or key.                           |
| `Object`        | `DeepMapValues`                                   | Deep map over an object's values.                                        |
| `Object`        | `Emplace`                                         | Emplace new key-value pairs in an object.                                |
| `Object`        | `Keys`, `Values`                                  | Get the keys or values of an object.                                     |
| `Object`        | `MapKeys`, `MapValues`                            | Map over the keys or values of an object.                                |
| `Object`        | `Merge`                                           | Merge two objects into a new one.                                        |
| `Parser`        | `Choice`                                          | Selects one of multiple alternative parsers.                             |
| `Parser`        | `Letter`, `Letters`                               | Parsers for matching single or multiple letters.                         |
| `Parser`        | `Many1`, `Optional`                               | Parser combinators for repetition and optionality.                       |
| `Parser`        | `Map`                                             | Applies a transformation function to the result of a parser.             |
| `Parser`        | `ObjectSequence`                                  | Parses an object based on key-value sequence specifications.             |
| `Parser`        | `Run`                                             | Executes a parser on an input string.                                    |
| `Parser`        | `Sequence`                                        | Parses a sequence of input elements.                                     |
| `Parser`        | `State`                                           | Represents the state of a parser.                                        |
| `Parser`        | `String`                                          | Parser for matching a specific input string.                             |
| `Parser`        | `TakeSequence`                                    | Takes a sequence of characters from a string.                            |
| `String`        | `Append`, `Prepend`                               | Append or prepend a character to a string.                               |
| `String`        | `EndsWith`, `StartsWith`                          | Check if a string ends or starts with a given substring.                 |
| `String`        | `First`, `Last`                                   | Get the first or last character in a string.                             |
| `String`        | `FromList`                                        | Convert list of characters to a string.                                  |
| `String`        | `Includes`                                        | Checks if a string includes a given substring.                           |
| `String`        | `Init`, `Tail`                                    | Gets the initial or tail part of a string.                               |
| `String`        | `IsString`                                        | Determines if a type is a valid string type.                             |
| `String`        | `IsTemplate`                                      | Determines if a type is a string with template parts.                    |
| `String`        | `Join`                                            | Joins elements of supplied list to create a string.                      |
| `String`        | `Length`                                          | Calculate the length of the input string type.                           |
| `String`        | `Replace`                                         | Replace a substring in a string with another.                            |
| `String`        | `Reverse`                                         | Reverses a string.                                                       |
| `String`        | `Slice`                                           | Slices a portion of a string.                                            |
| `String`        | `Split`                                           | Splits a string into a list.                                             |
| `Test`          | `Expect`, ExpectNot                               | Assert that types are logically equal or not equal.                      |
| `Type`          | `Cast`                                            | Cast a type to conform to a narrowed type.                               |
| `Type`          | `Display`                                         | Displays the "inner type" of a type wrapper.                             |
| `Type`          | `Infer`                                           | Infers the a given type within a given object class.                     |

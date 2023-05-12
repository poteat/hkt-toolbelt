# Kind Legend

| Symbol              | Description                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| $S$                 | String                                                                                  |
| $N$                 | Number                                                                                  |
| $B$                 | Boolean                                                                                 |
| $X_{0..n}$          | Arbitrary value (bound "type parameters")                                               |
| $P$                 | Parser                                                                                  |
| $P_S$               | Parser which returns a string                                                           |
| $P_{X_0}$           | Parser which returns $X_0$ (i.e. $K_{PS \rarr X_0}$ where $PS$ is monadic Parser-State) |
| $K$                 | Function                                                                                |
| $K_{X_0 \rarr X_1}$ | Function from value $X_0$ to value $X_1$                                                |
| $T\text{[i]}$       | List of values                                                                          |

## Parser Kind 'Math' Syntax 101

$P_{X_0..X_n}[i] \Rarr P_{X_{0..n}[i]}$ (`Parser.Sequence`)

The above expression refers to a 'function' that takes in a _list_ of parsers, each of which may return a different type of value, and returns a parser that returns a list of values of the same type as the input parsers.

For example, we have the following:

```ts
type MyParser = $<
  Parser.Sequence,
  [$<Parser.Literal, 'foo'>, $<Parser.Literal, 'bar'>]
>

type Output = $<$<Parser.Run, MyParser>, 'foobarbarfoo'> // ["foo", "bar", "bar", "foo"]
```

All that the above expression is saying is that `Sequence` takes in a list of parsers, and will 'transfer' the types of the input parsers to the output parser as a list.

Where the particular type relationships "don't matter", we omit the subscript, e.g. $P$ or $K$. For example, there is no "interesting relationship" between the parsers in `Parser.Between`, so we just write $P \Rarr P \Rarr P$.

# Parser Utilities

| Namespace      | Utility                | Description                                       | Kind                                           |
| -------------- | ---------------------- | ------------------------------------------------- | ---------------------------------------------- |
| Parser         | `Literal`              | Parse a constant string.                          | $S \Rarr P_S$                                  |
| Parser         | `Char`                 | Parse a constant character union.                 | $S \Rarr P_S$                                  |
| Parser         | `Many`                 | Parse zero or more instances of a given parser.   | $P_{X_0} \Rarr P_{X_0[i]}$                     |
| Parser         | `Map`                  | Parse a value and map it to another value.        | $K_{X_0 \rarr X_1}\Rarr P_{X_0} \Rarr P_{X_1}$ |
| Parser         | `Choice`               | Parse one of a list of parsers.                   | $P_{X_0..X_n}[i] \Rarr P_{X_i}$                |
| Parser         | `Sequence`             | Parse a sequence of parsers.                      | $P_{X_0..X_n}[i] \Rarr P_{X_{0..n}[i]}$        |
| Parser         | `AnyCharExcept`        | Parse any character except a given parser.        | $P \Rarr P_S$                                  |
| Parser         | `SeparatedBy`          | Parse a value separated by a given parser.        | $P_{X_0} \Rarr P_{X_1} \Rarr P_{X_1[i]}$       |
| Parser         | `Between`              | Parse between two parsers, on the left and right. | $P \Rarr P \Rarr P$                            |
| Parser.Utility | `CommaSeparated`       | Parse a comma-separated list of values.           | $P_{X_0} \Rarr P_{X_0[i]}$                     |
| Parser.Utility | `OptionalWhitespace`   | Parse zero or more whitespace characters.         | $P_S$                                          |
| Parser.Utility | `WhitespaceSurrounded` | Parse a value surrounded by optional whitespace.  | $P_{X_0} \Rarr P_{X_0}$                        |
| Parser.JSON    | `JSON`                 | Parse a JSON value.                               | $P$                                            |
| Parser.JSON    | `String`               | Parse a JSON string value.                        | $P_S$                                          |
| Parser.JSON    | `Boolean`              | Parse a JSON boolean value.                       | $P_B$                                          |
| Parser.JSON    | `Null`                 | Parse a JSON null value.                          | $P$                                            |
| Parser.JSON    | `Object`               | Parse a JSON object value.                        | $P$                                            |
| Parser.JSON    | `EscapedCharacter`     | Parse an escaped character.                       | $P_S$                                          |
| Parser.JSON    | `KeyValuePair`         | Parse a key-value pair, without curly brackets.   | $P$                                            |

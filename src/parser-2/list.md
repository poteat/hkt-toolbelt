# Parser Utilities

| Status | Utility              | Description                                       | Type          |
| ------ | -------------------- | ------------------------------------------------- | ------------- |
| ✅     | `literal`            | Parse a constant string.                          | `P`           |
| ✅     | `char`               | Parse a constant character union.                 | `P`           |
| ✅     | `optionalWhitespace` | Parse zero or more whitespace characters.         | `P`           |
| ✅     | `many`               | Parse zero or more instances of a given parser.   | `P => P`      |
| ✅     | `choice`             | Parse one of a list of parsers.                   | `P[] => P`    |
| ✅     | `sequence`           | Parse a sequence of parsers.                      | `P[] => P`    |
| ✅     | `anyCharExcept`      | Parse any character except a given parser.        | `P => P`      |
| ✅     | `sepBy`              | Parse a value separated by a given parser.        | `P => P => P` |
| ✅     | `between`            | Parse between two parsers, on the left and right. | `P => P => P` |

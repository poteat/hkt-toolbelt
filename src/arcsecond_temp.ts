import * as A from 'arcsecond'
import {
  between,
  optionalWhitespace,
  sepBy,
  choice,
  str,
  many,
  anythingExcept,
  recursiveParser,
  sequenceOf
} from 'arcsecond'

/**
 * ----------------------------------------------------------------------------
 * UTILITIES
 * ----------------------------------------------------------------------------
 */

/**
 * A parser utility to surround another parser with optional whitespace.
 */
const whitespaceSurrounded = (parser: A.Parser<any>) =>
  between(optionalWhitespace)(optionalWhitespace)(parser)

/**
 * A parser utility that takes a parser and returns a parser that will parse
 * zero or more of the given parser, each separated by a comma and optional
 * whitespace.
 */
const commaSeparated = sepBy(whitespaceSurrounded(str(',')))

/**
 * ----------------------------------------------------------------------------
 * TERMINAL PARSERS
 * ----------------------------------------------------------------------------
 */

/**
 * Parser for boolean value literals.
 */
const parseBoolean = choice([str('true'), str('false')]).map(Boolean)

/**
 * Parser for 'null' value literal.
 */
const parseNull = str('null').map(() => null)

/**
 * Parser for any escaped character.
 */
const parseEscapedCharacter = choice([
  str('\\\\').map(() => '\\'),
  str('\\"').map(() => '"'),
  str('\\r').map(() => '\r'),
  str('\\n').map(() => '\n'),
  str('\\t').map(() => '\t'),
  str('\\b').map(() => '\b'),
  str('\\f').map(() => '\f')
])

/**
 * Parser for JSON string literals.
 */
const parseString = between(str('"'))(str('"'))(
  many(
    choice([
      parseEscapedCharacter,
      anythingExcept(str('"')).map(String.fromCharCode)
    ])
  ).map(x => x.join(''))
)

/**
 * ----------------------------------------------------------------------------
 * RECURSIVE PARSERS
 * ----------------------------------------------------------------------------
 */

/**
 * Parser for arbitrary JSON values.
 */
const parseValue: A.Parser<unknown, string, any> = recursiveParser(() =>
  choice([parseBoolean, parseNull, parseString, parseArray, parseObject])
)

/**
 * Parser for arrays.
 */
const parseArray = between(whitespaceSurrounded(str('[')))(
  whitespaceSurrounded(str(']'))
)(commaSeparated(parseValue))

/**
 * Parser for key-value pairs inside of objects.
 */
const parseKeyValue = whitespaceSurrounded(
  sequenceOf([parseString, whitespaceSurrounded(str(':')), parseValue])
  //@ts-ignore
).map(([key, _, value]) => [key, value])

/**
 * Parser for objects.
 */
const parseObject = between(whitespaceSurrounded(str('{')))(
  whitespaceSurrounded(str('}'))
)(commaSeparated(parseKeyValue)).map(Object.fromEntries as never)

const result = parseValue.run(
  `[  "hello", "world", [true], false, {"foo": "bar"}]`
)

console.log(result)

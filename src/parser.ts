export * from './parser/'

/**
 * The `Parser` module contains various utilities for building type-level
 * parsers, which take in a string literal and return a type representing the
 * result of parsing the string.
 *
 * These utilities are particularly useful for parsing input strings and
 * converting them into more meaningful types.
 *
 * @example
 * ```ts
 * import { $, Parser } from "hkt-toolbelt";
 *
 * type Result = $<
 *   $<
 *     Parser.Run,
 *     $<
 *       Parser.Sequence,
 *       [$<Parser.String, 'hello'>, $<Parser.String, ' '>, Parser.Letters]
 *     >
 *   >,
 *   'hello worlds'
 * > // ["hello", " ", "worlds"]
 * ```
 */
declare module './parser' {}

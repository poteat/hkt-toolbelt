export * from './loop/'

/**
 * The `Loop` module contains various utilities for working with loops. Loops
 * are a type-level programming construct that allows you to repeat a block of
 * code until a certain condition is met.
 *
 * @example
 * ```ts
 * import { $, NaturalNumber, Loop } from 'hkt-toolbelt'
 *
 * type Result = $<
 *   $<Loop.Until, $<NaturalNumber.IsGreaterThan, 10>>,
 *   $<NaturalNumber.Add, 1>,
 *   0
 * > // 11
 * ```
 */
declare module './loop' {}

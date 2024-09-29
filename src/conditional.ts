export * from './conditional/'

/**
 * The `Conditional` module contains various conditional type utilities. These
 * utilities are used to express conditional logic in type-level programming.
 *
 * @example
 * ```ts
 * import { $, Conditional } from 'hkt-toolbelt'
 *
 * type MyFcn = $<$<Conditional.If, $<Conditional.Equals, 123>, 'foo'>, 'bar'>
 *
 * type Result = $<MyFcn, 123> // 'foo'
 * type Result2 = $<MyFcn, 456> // 'bar'
 * ```
 */
declare module './conditional' {}

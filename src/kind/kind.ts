import { Function } from "..";

export declare const _: unique symbol;

export type _ = typeof _;

export declare abstract class Kind<
  F extends Function.Function = Function.Function
> {
  abstract readonly [_]: unknown;
  abstract f: F;
}

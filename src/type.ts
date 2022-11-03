import { Kind } from ".";

export type _$display<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends abstract new (...args: never[]) => unknown
  ? T
  : { [key in keyof T]: T[key] };

export abstract class Display extends Kind {
  abstract f: (x: this[Kind._]) => _$display<this[Kind._]>;
}

export type _$valueOf<T> = T extends unknown[] ? T[number] : T[keyof T];

export declare abstract class ValueOf extends Kind {
  abstract f: (x: this[Kind._]) => _$valueOf<typeof x>;
}

export * as Type from "./type";

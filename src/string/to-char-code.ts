import { Kind, Type } from '..'

type _$charCodeMap = {
  a: 97
  b: 98
  c: 99
  d: 100
  e: 101
  f: 102
  g: 103
  h: 104
  i: 105
  j: 106
  k: 107
  l: 108
  m: 109
  n: 110
  o: 111
  p: 112
  q: 113
  r: 114
  s: 115
  t: 116
  u: 117
  v: 118
  w: 119
  x: 120
  y: 121
  z: 122
  A: 65
  B: 66
  C: 67
  D: 68
  E: 69
  F: 70
  G: 71
  H: 72
  I: 73
  J: 74
  K: 75
  L: 76
  M: 77
  N: 78
  O: 79
  P: 80
  Q: 81
  R: 82
  S: 83
  T: 84
  U: 85
  V: 86
  W: 87
  X: 88
  Y: 89
  Z: 90
  '0': 48
  '1': 49
  '2': 50
  '3': 51
  '4': 52
  '5': 53
  '6': 54
  '7': 55
  '8': 56
  '9': 57
  ' ': 32
  '!': 33
  '"': 34
  '#': 35
  $: 36
  '%': 37
  '&': 38
  "'": 39
  '(': 40
  ')': 41
  '*': 42
  '+': 43
  ',': 44
  '-': 45
  '.': 46
  '/': 47
  ':': 58
  ';': 59
  '<': 60
  '=': 61
  '>': 62
  '?': 63
  '@': 64
  '[': 91
  '\\': 92
  ']': 93
  '^': 94
  _: 95
  '`': 96
  '{': 123
  '|': 124
  '}': 125
  '~': 126
  '\t': 9
  '\n': 10
  '\r': 13
  '\f': 12
  '\v': 11
}

/**
 * `_$toCharCode` is a type-level function that takes in a string `S` and
 * returns the character code of `S`. This is only valid for ASCII characters.
 *
 * @template {string} S - The string to get the character code of.
 *
 * @example
 * ```
 * type T0 = _$toCharCode<'f'> // 102
 * type T1 = _$toCharCode<'b'> // 98
 * ```
 */
export type _$toCharCode<S extends string> = S extends keyof _$charCodeMap
  ? _$charCodeMap[S]
  : never

/**
 * `ToCharCode` is a type-level function that takes in a string `S` and
 * returns the character code of `S`. This is only valid for ASCII characters.
 *
 * @template {string} S - The string to get the character code of.
 *
 * @example
 * ```ts
 * import { $, String } from "hkt-toolbelt";
 *
 * type Result = $<String.ToCharCode, 'f'> // 102
 * ```
 */
export interface ToCharCode extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$toCharCode<typeof x>
}

/**
 * Given a string, return the character code of the first character in the string.
 *
 * @param {string} x - The string to get the character code of.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.toCharCode('f')
 * //    ^? 102
 * ```
 */
export const toCharCode = ((x: string) =>
  x.charCodeAt(0)) as Kind._$reify<ToCharCode>

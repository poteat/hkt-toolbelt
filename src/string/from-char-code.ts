import { Kind, Type } from '..'

type _$charCodeMapInverse = {
  97: 'a'
  98: 'b'
  99: 'c'
  100: 'd'
  101: 'e'
  102: 'f'
  103: 'g'
  104: 'h'
  105: 'i'
  106: 'j'
  107: 'k'
  108: 'l'
  109: 'm'
  110: 'n'
  111: 'o'
  112: 'p'
  113: 'q'
  114: 'r'
  115: 's'
  116: 't'
  117: 'u'
  118: 'v'
  119: 'w'
  120: 'x'
  121: 'y'
  122: 'z'
  65: 'A'
  66: 'B'
  67: 'C'
  68: 'D'
  69: 'E'
  70: 'F'
  71: 'G'
  72: 'H'
  73: 'I'
  74: 'J'
  75: 'K'
  76: 'L'
  77: 'M'
  78: 'N'
  79: 'O'
  80: 'P'
  81: 'Q'
  82: 'R'
  83: 'S'
  84: 'T'
  85: 'U'
  86: 'V'
  87: 'W'
  88: 'X'
  89: 'Y'
  90: 'Z'
  48: '0'
  49: '1'
  50: '2'
  51: '3'
  52: '4'
  53: '5'
  54: '6'
  55: '7'
  56: '8'
  57: '9'
  32: ' '
  33: '!'
  34: '"'
  35: '#'
  36: '$'
  37: '%'
  38: '&'
  39: "'"
  40: '('
  41: ')'
  42: '*'
  43: '+'
  44: ','
  45: '-'
  46: '.'
  47: '/'
  58: ':'
  59: ';'
  60: '<'
  61: '='
  62: '>'
  63: '?'
  64: '@'
  91: '['
  92: '\\'
  93: ']'
  94: '^'
  95: '_'
  96: '`'
  123: '{'
  124: '|'
  125: '}'
  126: '~'
  9: '\t'
  10: '\n'
  13: '\r'
  12: '\f'
  11: '\v'
}

/**
 * `_$fromCharCode` is a type-level function that takes in a number `N` and
 * returns the character corresponding to that character code. This is only valid
 * for ASCII character codes.
 *
 * @template {number} N - The character code to get the character for.
 *
 * @example
 * ```
 * type T0 = _$fromCharCode<102> // 'f'
 * type T1 = _$fromCharCode<98> // 'b'
 * ```
 */
export type _$fromCharCode<N extends number> =
  N extends keyof _$charCodeMapInverse ? _$charCodeMapInverse[N] : never

/**
 * `FromCharCode` is a type-level function that takes in a number `N` and
 * returns the character corresponding to that character code. This is only valid
 * for ASCII character codes.
 *
 * @template {number} N - The character code to get the character for.
 *
 * @example
 * ```ts
 * import { $, String } from "hkt-toolbelt";
 *
 * type Result = $<String.FromCharCode, 102> // 'f'
 * ```
 */
export interface FromCharCode extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], number>): _$fromCharCode<typeof x>
}

/**
 * Given a character code, return the corresponding character.
 *
 * @param {number} x - The character code to get the character for.
 *
 * @example
 * ```ts
 * import { String } from "hkt-toolbelt";
 *
 * const result = String.fromCharCode(102)
 * //    ^? 'f'
 * ```
 */
export const fromCharCode = ((x: number) =>
  String.fromCharCode(x)) as Kind._$reify<FromCharCode>

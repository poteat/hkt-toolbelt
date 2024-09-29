import { camelCase } from 'lodash'

/**
 * Converts a string to PascalCase.
 *
 * @param str - The string to convert.
 *
 * @returns The PascalCase version of the string.
 */
export function pascalCase(str: string) {
  const camel = camelCase(str)
  return camel.charAt(0).toUpperCase() + camel.slice(1)
}

import { pascalCase } from '../string/pascalCase'

/**
 * Convert a path to a module name.
 *
 * @example "src/string/append.ts" => "String"
 */
export function pathToModuleName(path: string) {
  return pascalCase(path.split('/')[1]) || '$'
}

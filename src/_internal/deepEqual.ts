export function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true

  if (
    a &&
    b &&
    typeof a === 'object' &&
    typeof b === 'object' &&
    Object.getPrototypeOf(a) === Object.getPrototypeOf(b)
  ) {
    if (Array.isArray(a)) {
      if (!Array.isArray(b)) return false
      if (a.length !== b.length) return false
      for (let i = 0; i < a.length; i++) {
        if (!deepEqual(a[i], b[i])) return false
      }
      return true
    }

    if (a instanceof Map) {
      if (!(b instanceof Map)) return false
      if (a.size !== b.size) return false
      for (const [key, val] of a) {
        if (!b.has(key)) return false
        if (!deepEqual(val, b.get(key))) return false
      }
      return true
    }

    if (a instanceof Set) {
      if (!(b instanceof Set)) return false
      if (a.size !== b.size) return false
      for (const val of a) {
        if (!b.has(val)) return false
      }
      return true
    }

    if (a instanceof Date) {
      if (!(b instanceof Date)) return false
      return a.getTime() === b.getTime()
    }

    if (a instanceof RegExp) {
      if (!(b instanceof RegExp)) return false
      return a.toString() === b.toString()
    }

    const aKeys = Object.keys(a as Record<string, unknown>)
    const bKeys = Object.keys(b as Record<string, unknown>)
    if (aKeys.length !== bKeys.length) return false

    for (const key of aKeys) {
      if (
        !deepEqual(
          (a as Record<string, unknown>)[key],
          (b as Record<string, unknown>)[key]
        )
      )
        return false
    }

    return true
  }

  return false
}

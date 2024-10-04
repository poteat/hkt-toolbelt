export function deepEqual(a: any, b: any): boolean {
  if (a === b) return true

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (a.constructor !== b.constructor) return false

    if (Array.isArray(a)) {
      if (a.length !== b.length) return false
      for (let i = 0; i < a.length; i++) {
        if (!deepEqual(a[i], b[i])) return false
      }
      return true
    }

    if (a instanceof Map) {
      if (a.size !== b.size) return false
      for (const [key, val] of a) {
        if (!b.has(key) || !deepEqual(val, b.get(key))) return false
      }
      return true
    }

    if (a instanceof Set) {
      if (a.size !== b.size) return false
      for (const val of a) {
        if (!b.has(val)) return false
      }
      return true
    }

    if (a instanceof Date) return a.getTime() === b.getTime()
    if (a instanceof RegExp) return a.toString() === b.toString()

    const keys = Object.keys(a)
    if (keys.length !== Object.keys(b).length) return false

    for (const key of keys) {
      if (!deepEqual(a[key], b[key])) return false
    }

    return true
  }

  return Number.isNaN(a) && Number.isNaN(b)
}

export function hash(value: unknown): string {
  const seen = new WeakMap<object, number>()
  let objectCount = 0

  function innerHash(val: unknown): string {
    if (val === null) return 'null'
    if (val === undefined) return 'undefined'

    const type = typeof val

    if (
      type === 'boolean' ||
      type === 'number' ||
      type === 'bigint' ||
      type === 'symbol'
    ) {
      return `${type}:${String(val)}`
    }

    if (type === 'string') {
      return `string:${val}`
    }

    if (type === 'function') {
      return `function:${val.toString()}`
    }

    if (type === 'object') {
      if (seen.has(val as object)) {
        return `circular#${seen.get(val as object)}`
      }

      seen.set(val as object, objectCount++)

      if (Array.isArray(val)) {
        const items = val.map((item) => innerHash(item))
        return `array:[${items.join(',')}]`
      } else if (val instanceof Set) {
        const items = Array.from(val.values())
          .map((item) => innerHash(item))
          .sort()
        return `set:{${items.join(',')}}`
      } else if (val instanceof Map) {
        const entries = Array.from(val.entries())
          .map(([key, value]) => `${innerHash(key)}=>${innerHash(value)}`)
          .sort()
        return `map:{${entries.join(',')}}`
      } else if (val instanceof Date) {
        return `date:${val.toISOString()}`
      } else if (val instanceof RegExp) {
        return `regexp:${val.toString()}`
      } else {
        const keys = Object.keys(val as object).sort()
        const entries = keys.map(
          (key) => `${key}:${innerHash((val as any)[key])}`
        )
        return `object:{${entries.join(',')}}`
      }
    }

    return 'unknown'
  }

  return innerHash(value)
}

export function hash(value: unknown): string {
  const seen = new WeakMap<object, number>()
  let objectCount = 0

  function innerHash(val: unknown): string {
    if (val === null) return 'null'
    if (val === undefined) return 'undefined'

    if (
      typeof val === 'boolean' ||
      typeof val === 'number' ||
      typeof val === 'bigint' ||
      typeof val === 'symbol'
    ) {
      return `${typeof val}:${String(val)}`
    }

    if (typeof val === 'string') {
      return `string:${val}`
    }

    if (typeof val === 'function') {
      return `function:${val.toString()}`
    }

    if (typeof val === 'object') {
      if (seen.has(val)) {
        return `circular#${seen.get(val)}`
      }

      seen.set(val, objectCount++)

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
        const keys = Object.keys(val).sort()
        const entries = keys.map(
          (key) => `${key}:${innerHash(val[key as keyof typeof val])}`
        )
        return `object:{${entries.join(',')}}`
      }
    }

    return 'unknown'
  }

  return innerHash(value)
}

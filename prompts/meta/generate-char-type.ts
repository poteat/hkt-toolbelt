function generateCharString(n: number): string {
  let result = 'type CharString =\n'

  for (let i = 0; i < n; i++) {
    const charCode = i.toString(16).padStart(4, '0')
    result += `  | '\\u${charCode}'\n`
  }

  return result
}

if (process.argv.length !== 3) {
  console.error('Usage: generate-char-string <num-chars>')
  process.exit(1)
}

const numChars = Number(process.argv[2])
const charString = generateCharString(numChars)
console.log(charString)

# Multi-Aider

The `multi-aider.ts` script is a utility for running multiple commands in parallel. It takes a glob pattern for input files and a script template as command-line arguments, and runs the script for each input file.

## Usage

```bash
ts-node multi-aider.ts \
  --pattern 'glob-pattern' \
  --template 'script-template'
```

Replace `'glob-pattern'` with the glob pattern for your input files, and `'script-template'` with your script template. The script template should include `{s}` as a placeholder for the source file, and `{t}` as a placeholder for the corresponding spec file.

### Example

```sh
ts-node multi-aider.ts \
  --pattern './src/string/!(*.spec).ts' \
  --template 'echo Processing {s} and {t}'
```

This will echo a message for each `.ts` file in the `src/string` directory, excluding `.spec.ts` files. If a corresponding `.spec.ts` file exists for a source file, `{t}` will be replaced with the spec file; otherwise, `{t}` will be replaced with an empty string.

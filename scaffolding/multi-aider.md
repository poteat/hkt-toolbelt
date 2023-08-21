# Multi-Aider

The `multi-aider.ts` script is a utility for running multiple commands in parallel. It takes a glob pattern for input files and a script template as command-line arguments, and runs the script for each input file.

The script includes several functions:

- `replacePlaceholders()`: This function replaces placeholders in a template with their corresponding values.
- `checkSpecFile()`: This function checks if a spec file exists for a given file and template.
- `generateCommand()`: This function generates a command for a given file, spec file, template, and extra files.
- `generateCommands()`: This function generates commands for a list of files, a template, and extra files.
- `promptUser()`: This function prompts the user to confirm execution of the commands and then executes them.

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


## Example Resultant Aider Command

```sh
ts-node ./scaffolding/multi-aider.ts \
  --template "Can we write JSDoc for {s} per style-guide/jsdoc.md? The spec file {t} may be useful." \
  --pattern "./src/string/!(*.spec).ts" \
  --extraFiles style-guide/jsdoc.md style-guide/tests.md
```

```sh
aider\
  --msg="Can we write JSDoc for src/string/includes.ts per style-guide/jsdoc.md? The spec file src/string/includes.spec.ts may be useful."\
  src/string/includes.ts\
  src/string/includes.spec.ts\
  style-guide/jsdoc.md\
  style-guide/tests.md

# ...
```

import { exec } from 'child_process'

exec(
  `aider\
--msg="Can we write JSDoc for src/string/to-upper.ts per style-guide/jsdoc.md? The spec file src/string/to-upper.spec.ts may be useful."\
src/string/to-upper.ts\
src/string/to-upper.spec.ts\
style-guide/jsdoc.md`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(`stdout: ${stdout}`)
    console.error(`stderr: ${stderr}`)
  }
)

import * as fs from 'fs'
import { mergeViaKey } from './utilities/object/mergeViaKey'
import { getModuleInfo } from './visitors/getModuleInfo'
import { getUtilitiesInfo } from './visitors/getUtilitiesInfo'

import Mustache from 'mustache'
import { escapeForMarkdown } from './utilities/formatting/markdown/escapeForMarkdown'

async function main() {
  const moduleInfo = await getModuleInfo()
  const utilitiesInfo = await getUtilitiesInfo()

  const mergedUtilitiesInfo = mergeViaKey(moduleInfo, utilitiesInfo, 'name')

  const template = await fs.promises.readFile(
    './docs/readme.template.md',
    'utf-8'
  )

  Mustache.escape = escapeForMarkdown

  const numberOfModules = Object.keys(mergedUtilitiesInfo).length

  const numberOfUtilities = mergedUtilitiesInfo.reduce(
    (acc, module) =>
      acc + module.files.reduce((acc, file) => acc + file.utilities.length, 0),
    0
  )

  const rendered = Mustache.render(template, {
    modules: mergedUtilitiesInfo,
    numberOfModules,
    numberOfUtilities
  })

  await fs.promises.writeFile(
    './docs/utilities.json',
    JSON.stringify(mergedUtilitiesInfo, null, 2)
  )

  await fs.promises.writeFile('./docs/readme.md', rendered)
}

main().catch(console.error)

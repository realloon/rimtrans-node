import type { Def } from '@/types'

const aboutXml = (defs: Array<Def>) =>`
<?xml version="1.0" encoding="utf-8"?>
<LanguageData>
${defs.map(def => `  <${def.tagName}>${def.translated}</${def.tagName}>\n`)
      .join('')}</LanguageData>`.replace('\n', '')

export default aboutXml

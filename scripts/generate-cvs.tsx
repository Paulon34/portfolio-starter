import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToBuffer } from '@react-pdf/renderer'
import { getPortfolioData, validatePortfolioData } from '../src/data/validate.ts'
import type { CvFocus, Locale } from '../src/data/types.ts'
import { CvDocument } from './cv/Document.tsx'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'public', 'resume')

async function main() {
  const data = getPortfolioData()
  const checked = validatePortfolioData(data)
  if (!checked.ok) {
    console.error(checked.error)
    process.exit(1)
  }

  mkdirSync(outDir, { recursive: true })

  const slug = data.profile.fullName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  for (const name of readdirSync(outDir)) {
    if (name.endsWith('.pdf')) rmSync(path.join(outDir, name), { force: true })
  }

  const locales: Locale[] = ['pt-BR', 'en']
  const focuses: CvFocus[] = ['infra', 'software']

  for (const locale of locales) {
    for (const focus of focuses) {
      const localeToken = locale === 'pt-BR' ? 'pt' : 'en'
      const filename = `${slug}-${localeToken}-${focus}.pdf`
      const buffer = await renderToBuffer(
        <CvDocument data={data} locale={locale} focus={focus} />,
      )
      writeFileSync(path.join(outDir, filename), buffer)
      console.log('wrote', filename, buffer.byteLength, 'bytes')
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

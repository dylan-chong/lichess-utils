#!/usr/bin/env ts-node

import * as fs from 'fs'
import * as path from 'path'
import { glob } from 'glob'

interface LintError {
  file: string
  line: number
  message: string
}

const VAGUE_TEST_PATTERNS = [
  /it\s*\(\s*['"`].*\b(should handle|handles)\b/i,
  /it\s*\(\s*['"`].*\b(should work|works)\b/i,
  /it\s*\(\s*['"`].*\b(should process|processes)\b/i,
]

function lintFile(filePath: string): LintError[] {
  const errors: LintError[] = []
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')

  lines.forEach((line, index) => {
    for (const pattern of VAGUE_TEST_PATTERNS) {
      if (pattern.test(line)) {
        errors.push({
          file: filePath,
          line: index + 1,
          message: 'Tests should describe the expected observable behaviour, not implementation details or vague actions',
        })
        break
      }
    }
  })

  return errors
}

async function main() {
  const testFiles = await glob('src/**/*.test.{ts,tsx}', { cwd: process.cwd() })

  let totalErrors = 0
  const allErrors: LintError[] = []

  for (const file of testFiles) {
    const errors = lintFile(file)
    allErrors.push(...errors)
    totalErrors += errors.length
  }

  if (allErrors.length > 0) {
    console.error('\n❌ Custom lint errors found:\n')

    for (const error of allErrors) {
      console.error(`${error.file}:${error.line}`)
      console.error(`  ${error.message}`)
      console.error()
    }

    console.error(`Found ${totalErrors} vague test description(s)`)
    process.exit(1)
  }

  console.log('✅ No custom lint errors found')
}

main().catch((error) => {
  console.error('Error running custom linter:', error)
  process.exit(1)
})

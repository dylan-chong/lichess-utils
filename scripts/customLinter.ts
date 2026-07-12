#!/usr/bin/env ts-node

import * as fs from 'fs'
import * as path from 'path'
import { glob } from 'glob'
import {
  getLayerFromPath,
  isImportAllowed,
  getViolationMessage,
} from './layerBoundaries'

interface LintError {
  file: string
  line: number
  message: string
}

const VAGUE_TEST_PATTERNS = [
  /it\s*\(\s*['"`].*\b(should handle|handles)\b/i,
  /it\s*\(\s*['"`].*\b(should work|works)\b/i,
  /it\s*\(\s*['"`].*\b(should process|processes)\b/i,
  /it\s*\(\s*['"`].*\b(should proceed)\b/i,
]

const DISALLOWED_MOCK_PATTERNS = [
  { pattern: /\bvi\.stub/i, message: 'Use simone mockModule() instead of vi.stub. Wrap globals, object instance methods, and constructors in modules like src/dom/dom.ts' },
  { pattern: /\bvi\.mock/i, message: 'Use simone mockModule() instead of vi.mock. Wrap globals, object instance methods, and constructors in modules like src/dom/dom.ts' },
  { pattern: /\bvi\.spyOn/i, message: 'Use simone mockModule() instead of vi.spyOn. Wrap globals, object instance methods, and constructors in modules like src/dom/dom.ts' },
]

const DISALLOWED_ASSERTION_PATTERNS = [
  { pattern: /\.not\.toBeNull\(\)/, message: 'Avoid .not.toBeNull(). Use a more specific assertion (e.g. toBeInstanceOf(), assert a specific value, or check a property of the result)' },
  { pattern: /\.not\.toBe\(/, message: 'Avoid .not.toBe(). Use a more specific assertion (e.g. toBeInstanceOf(), assert a specific value, or check a property of the result)' },
  { pattern: /\.toBeTruthy\(\)/, message: 'Avoid .toBeTruthy(). Use a more specific assertion (e.g. toBe(true), toBeInstanceOf(), assert a specific value, or check a property of the result)' },
  { pattern: /\.toBeDefined\(\)/, message: 'Avoid .toBeDefined(). Use a more specific assertion (e.g. toBeInstanceOf(), assert a specific value, or check a property of the result)' },
]

function checkVagueTestDescriptions(content: string, filePath: string): LintError[] {
  const errors: LintError[] = []
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

function checkDisallowedMockingPatterns(content: string, filePath: string): LintError[] {
  const errors: LintError[] = []
  const lines = content.split('\n')

  lines.forEach((line, index) => {
    for (const { pattern, message } of DISALLOWED_MOCK_PATTERNS) {
      if (pattern.test(line)) {
        errors.push({
          file: filePath,
          line: index + 1,
          message,
        })
      }
    }
  })

  return errors
}

function checkDisallowedAssertions(content: string, filePath: string): LintError[] {
  const errors: LintError[] = []
  const lines = content.split('\n')

  lines.forEach((line, index) => {
    for (const { pattern, message } of DISALLOWED_ASSERTION_PATTERNS) {
      if (pattern.test(line)) {
        errors.push({
          file: filePath,
          line: index + 1,
          message,
        })
      }
    }
  })

  return errors
}

function checkAwaitImportAtTopLevel(content: string, filePath: string): LintError[] {
  const errors: LintError[] = []
  const lines = content.split('\n')

  lines.forEach((line, index) => {
    if (/^\bawait\s+import\s*\(/.test(line)) {
      errors.push({
        file: filePath,
        line: index + 1,
        message: 'Use static import syntax instead of await import() at top level',
      })
    }
  })

  return errors
}

function checkLayerBoundaries(content: string, filePath: string): LintError[] {
  const errors: LintError[] = []
  const lines = content.split('\n')

  // Determine the layer of the current file
  const fromLayer = getLayerFromPath(filePath)
  if (!fromLayer) {
    // Skip files that don't belong to a known layer
    return errors
  }

  // Regular expressions to match import statements
  const importPatterns = [
    /import\s+.*?\s+from\s+['"](.+?)['"]/,  // import X from 'path'
    /import\s+['"](.+?)['"]/,                // import 'path'
    /export\s+.*?\s+from\s+['"](.+?)['"]/,  // export X from 'path'
  ]

  lines.forEach((line, index) => {
    for (const pattern of importPatterns) {
      const match = pattern.exec(line)
      if (!match) continue

      const importPath = match[1]

      // Skip external packages (not relative imports)
      if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
        continue
      }

      // Resolve the absolute path of the imported file
      const fileDir = path.dirname(filePath)
      const resolvedPath = path.resolve(fileDir, importPath)

      // Get the layer of the imported file
      const toLayer = getLayerFromPath(resolvedPath)
      if (!toLayer) {
        // Skip if we can't determine the layer
        continue
      }

      // Check if this import is allowed
      if (!isImportAllowed(fromLayer, toLayer)) {
        errors.push({
          file: filePath,
          line: index + 1,
          message: getViolationMessage(fromLayer, toLayer),
        })
      }
    }
  })

  return errors
}


async function main() {
  // Lint all source files for layer boundaries
  const allFiles = await glob('src/**/*.{ts,tsx}', { cwd: process.cwd() })
  // Lint test files for test-specific rules
  const testFiles = await glob('src/**/*.test.{ts,tsx}', { cwd: process.cwd() })

  let totalErrors = 0
  const allErrors: LintError[] = []

  // Check all files for layer boundaries and await import
  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf-8')
    allErrors.push(...checkLayerBoundaries(content, file))
    allErrors.push(...checkAwaitImportAtTopLevel(content, file))
  }

  // Check test files for test-specific rules
  for (const file of testFiles) {
    const content = fs.readFileSync(file, 'utf-8')
    allErrors.push(...checkVagueTestDescriptions(content, file))
    allErrors.push(...checkDisallowedMockingPatterns(content, file))
    allErrors.push(...checkDisallowedAssertions(content, file))
  }

  totalErrors = allErrors.length

  if (allErrors.length > 0) {
    console.error('\n❌ Custom lint errors found:\n')

    for (const error of allErrors) {
      console.error(`${error.file}:${error.line}`)
      console.error(`  ${error.message}`)
      console.error()
    }

    console.error(`Found ${totalErrors} lint error(s)`)
    process.exit(1)
  }

  console.log('✅ No custom lint errors found')
}

main().catch((error) => {
  console.error('Error running custom linter:', error)
  process.exit(1)
})

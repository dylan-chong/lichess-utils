import { describe, it, expect } from 'vitest'
import { parseDrawCommand } from './commandParser'
import { AnnotationType } from '../constants'

describe('parseDrawCommand', () => {
  it('parses single circle command', () => {
    const result = parseDrawCommand('-e4')
    expect(result).toEqual([
      { type: AnnotationType.CIRCLE, square: 'e4' },
    ])
  })

  it('parses single arrow command', () => {
    const result = parseDrawCommand('-e2e4')
    expect(result).toEqual([
      { type: AnnotationType.ARROW, from: 'e2', to: 'e4' },
    ])
  })

  it('parses multiple annotations', () => {
    const result = parseDrawCommand('-a1,b2c3,d4')
    expect(result).toEqual([
      { type: AnnotationType.CIRCLE, square: 'a1' },
      { type: AnnotationType.ARROW, from: 'b2', to: 'c3' },
      { type: AnnotationType.CIRCLE, square: 'd4' },
    ])
  })

  it('returns empty array for invalid command', () => {
    const result = parseDrawCommand('e4')
    expect(result).toEqual([])
  })

  it('returns empty array for dash only', () => {
    const result = parseDrawCommand('-')
    expect(result).toEqual([])
  })
})

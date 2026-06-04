import { describe, it, expect } from 'vitest'
import { parseDrawCommand } from './commandParser'

describe('parseDrawCommand', () => {
  it('parses single circle command', () => {
    const result = parseDrawCommand('-e4')
    expect(result).toEqual([
      { type: 'circle', square: 'e4' },
    ])
  })

  it('parses single arrow command', () => {
    const result = parseDrawCommand('-e2e4')
    expect(result).toEqual([
      { type: 'arrow', from: 'e2', to: 'e4' },
    ])
  })

  it('parses multiple annotations', () => {
    const result = parseDrawCommand('-a1,b2c3,d4')
    expect(result).toEqual([
      { type: 'circle', square: 'a1' },
      { type: 'arrow', from: 'b2', to: 'c3' },
      { type: 'circle', square: 'd4' },
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

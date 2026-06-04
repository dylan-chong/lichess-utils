import { describe, it, expect } from 'vitest'
import { shouldFlash, getNextFlashTime } from './flashTiming'

describe('shouldFlash', () => {
  it('returns true when interval has elapsed', () => {
    const lastFlash = 1000
    const now = 4000
    const interval = 3 // 3 seconds

    const result = shouldFlash(lastFlash, now, interval)
    expect(result).toBe(true)
  })

  it('returns false when interval has not elapsed', () => {
    const lastFlash = 1000
    const now = 3000
    const interval = 3

    const result = shouldFlash(lastFlash, now, interval)
    expect(result).toBe(false)
  })

  it('handles exact boundary', () => {
    const lastFlash = 1000
    const now = 4000
    const interval = 3

    const result = shouldFlash(lastFlash, now, interval)
    expect(result).toBe(true)
  })
})

describe('getNextFlashTime', () => {
  it('calculates next flash time', () => {
    const now = 1000
    const interval = 5

    const result = getNextFlashTime(now, interval)
    expect(result).toBe(6000) // 1000 + 5000
  })
})

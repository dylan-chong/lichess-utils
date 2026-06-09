import { describe, expect, it } from 'vitest'
import { getBlackedOutQuadrants, getTimingMs } from './blackSegments'

describe('getBlackedOutQuadrants', () => {
  it('returns empty array for none mode', () => {
    expect(getBlackedOutQuadrants('none', 0)).toEqual([])
    expect(getBlackedOutQuadrants('none', 5)).toEqual([])
  })

  it('returns single quadrant for 1/4 mode', () => {
    expect(getBlackedOutQuadrants('1/4', 0)).toEqual([0])
    expect(getBlackedOutQuadrants('1/4', 1)).toEqual([1])
    expect(getBlackedOutQuadrants('1/4', 2)).toEqual([2])
    expect(getBlackedOutQuadrants('1/4', 3)).toEqual([3])
    expect(getBlackedOutQuadrants('1/4', 4)).toEqual([0])
  })

  it('returns two quadrants for 1/2 mode', () => {
    expect(getBlackedOutQuadrants('1/2', 0)).toEqual([0, 1])
    expect(getBlackedOutQuadrants('1/2', 1)).toEqual([2, 3])
    expect(getBlackedOutQuadrants('1/2', 2)).toEqual([0, 2])
    expect(getBlackedOutQuadrants('1/2', 3)).toEqual([1, 3])
    expect(getBlackedOutQuadrants('1/2', 4)).toEqual([0, 1])
  })

  it('returns three quadrants for 3/4 mode', () => {
    expect(getBlackedOutQuadrants('3/4', 0)).toEqual([1, 2, 3])
    expect(getBlackedOutQuadrants('3/4', 1)).toEqual([0, 2, 3])
    expect(getBlackedOutQuadrants('3/4', 2)).toEqual([0, 1, 3])
    expect(getBlackedOutQuadrants('3/4', 3)).toEqual([0, 1, 2])
    expect(getBlackedOutQuadrants('3/4', 4)).toEqual([1, 2, 3])
  })

  it('returns all quadrants for 4/4 mode', () => {
    expect(getBlackedOutQuadrants('4/4', 0)).toEqual([0, 1, 2, 3])
    expect(getBlackedOutQuadrants('4/4', 5)).toEqual([0, 1, 2, 3])
  })

  it('returns empty array for unknown mode', () => {
    expect(getBlackedOutQuadrants('unknown', 0)).toEqual([])
  })
})

describe('getTimingMs', () => {
  it('returns 10000 for rotate-10s', () => {
    expect(getTimingMs('rotate-10s')).toBe(10000)
  })

  it('returns 30000 for rotate-30s', () => {
    expect(getTimingMs('rotate-30s')).toBe(30000)
  })

  it('returns 60000 for rotate-60s', () => {
    expect(getTimingMs('rotate-60s')).toBe(60000)
  })

  it('returns null for dont-rotate', () => {
    expect(getTimingMs('dont-rotate')).toBe(null)
  })

  it('returns null for unknown timing', () => {
    expect(getTimingMs('unknown')).toBe(null)
  })
})

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getItem, setItem } from './storage'

describe('storage', () => {
  let mockGetItem: ReturnType<typeof vi.fn>
  let mockSetItem: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockGetItem = vi.fn()
    mockSetItem = vi.fn()

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: mockSetItem,
      },
      writable: true,
    })
  })

  it('getItem returns value from localStorage', () => {
    mockGetItem.mockReturnValue('test-value')

    const result = getItem('test-key')

    expect(mockGetItem).toHaveBeenCalledWith('test-key')
    expect(result).toBe('test-value')
  })

  it('getItem returns null when key not found', () => {
    mockGetItem.mockReturnValue(null)

    const result = getItem('missing-key')

    expect(result).toBeNull()
  })

  it('setItem calls localStorage.setItem with correct arguments', () => {
    setItem('test-key', 'test-value')

    expect(mockSetItem).toHaveBeenCalledWith('test-key', 'test-value')
  })
})

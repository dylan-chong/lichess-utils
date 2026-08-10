import { describe, expect, it, vi } from 'vitest'
import { isWakeLockSupported, releaseWakeLock, requestWakeLock } from './wakeLock'

describe('wakeLock', () => {
  describe('isWakeLockSupported', () => {
    it('checks for wakeLock in navigator', () => {
      // This test verifies the function uses 'in' operator correctly
      const hasWakeLock = 'wakeLock' in navigator
      const funcResult = isWakeLockSupported()
      expect(funcResult).toBe(hasWakeLock)
    })
  })

  describe('requestWakeLock', () => {
    it('calls navigator.wakeLock.request with screen', async () => {
      const mockSentinel = { release: vi.fn() } as unknown as WakeLockSentinel
      const mockRequest = vi.fn().mockResolvedValue(mockSentinel)
      ;(navigator as any).wakeLock = { request: mockRequest }

      const result = await requestWakeLock()
      expect(mockRequest).toHaveBeenCalledWith('screen')
      expect(result).toBe(mockSentinel)
    })
  })

  describe('releaseWakeLock', () => {
    it('calls release on the sentinel', async () => {
      const mockRelease = vi.fn().mockResolvedValue(undefined)
      const mockSentinel = { release: mockRelease } as unknown as WakeLockSentinel

      await releaseWakeLock(mockSentinel)
      expect(mockRelease).toHaveBeenCalled()
    })
  })
})

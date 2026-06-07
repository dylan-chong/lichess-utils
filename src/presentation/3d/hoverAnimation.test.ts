import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  type HoverAnimationState,
  createHoverAnimationState,
  startHoverAnimation,
  stopHoverAnimation,
} from './hoverAnimation'

describe('hoverAnimation', () => {
  let mockCanvasState: any
  let mockGetParams: () => { baseAngle: number; scale: number; isFlipped: boolean }

  beforeEach(() => {
    mockCanvasState = {
      camera: {
        position: {
          set: vi.fn(),
          x: 0,
        },
        up: {
          set: vi.fn(),
        },
        lookAt: vi.fn(),
      },
      renderer: {
        render: vi.fn(),
      },
      scene: {},
    }

    mockGetParams = vi.fn(() => ({
      baseAngle: 40,
      scale: 1,
      isFlipped: false,
    }))
  })

  describe('createHoverAnimationState', () => {
    it('creates state with null animationId and startTime', () => {
      const state = createHoverAnimationState()

      expect(state.animationId).toBe(null)
      expect(state.startTime).toBe(null)
    })
  })

  describe('startHoverAnimation', () => {
    it('starts animation and sets animationId', () => {
      const requestAnimationFrameSpy = vi.spyOn(global, 'requestAnimationFrame')
      requestAnimationFrameSpy.mockReturnValue(123)

      const state = createHoverAnimationState()
      startHoverAnimation(state, mockCanvasState, mockGetParams)

      expect(state.animationId).toBe(123)
      expect(state.startTime).toBeTypeOf('number')
      expect(requestAnimationFrameSpy).toHaveBeenCalledOnce()

      requestAnimationFrameSpy.mockRestore()
    })

    it('does nothing if animation is already running', () => {
      const requestAnimationFrameSpy = vi.spyOn(global, 'requestAnimationFrame')
      requestAnimationFrameSpy.mockReturnValue(123)

      const state = createHoverAnimationState()
      state.animationId = 999
      state.startTime = 1000

      startHoverAnimation(state, mockCanvasState, mockGetParams)

      expect(state.animationId).toBe(999)
      expect(state.startTime).toBe(1000)
      expect(requestAnimationFrameSpy).not.toHaveBeenCalled()

      requestAnimationFrameSpy.mockRestore()
    })

    it('stops animation when scale becomes 0', () => {
      const requestAnimationFrameSpy = vi.spyOn(global, 'requestAnimationFrame')
      const cancelAnimationFrameSpy = vi.spyOn(global, 'cancelAnimationFrame')
      let animateCallback: ((timestamp: number) => void) | null = null

      requestAnimationFrameSpy.mockImplementation((callback) => {
        animateCallback = callback as (timestamp: number) => void
        return 123
      })

      const state = createHoverAnimationState()
      const getParamsZero = vi.fn(() => ({
        baseAngle: 40,
        scale: 0,
        isFlipped: false,
      }))

      startHoverAnimation(state, mockCanvasState, getParamsZero)
      expect(state.animationId).toBe(123)

      // Trigger animation frame with scale=0
      animateCallback?.(performance.now())

      expect(cancelAnimationFrameSpy).toHaveBeenCalledWith(123)
      expect(state.animationId).toBe(null)
      expect(state.startTime).toBe(null)

      requestAnimationFrameSpy.mockRestore()
      cancelAnimationFrameSpy.mockRestore()
    })
  })

  describe('stopHoverAnimation', () => {
    it('cancels animation frame and resets state', () => {
      const cancelAnimationFrameSpy = vi.spyOn(global, 'cancelAnimationFrame')

      const state: HoverAnimationState = {
        animationId: 123,
        startTime: 1000,
      }

      stopHoverAnimation(state)

      expect(cancelAnimationFrameSpy).toHaveBeenCalledWith(123)
      expect(state.animationId).toBe(null)
      expect(state.startTime).toBe(null)

      cancelAnimationFrameSpy.mockRestore()
    })

    it('does nothing if animation is not running', () => {
      const cancelAnimationFrameSpy = vi.spyOn(global, 'cancelAnimationFrame')

      const state = createHoverAnimationState()
      stopHoverAnimation(state)

      expect(cancelAnimationFrameSpy).not.toHaveBeenCalled()
      expect(state.animationId).toBe(null)
      expect(state.startTime).toBe(null)

      cancelAnimationFrameSpy.mockRestore()
    })
  })
})

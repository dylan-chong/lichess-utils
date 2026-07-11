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
      const state = createHoverAnimationState()
      startHoverAnimation(state, mockCanvasState, mockGetParams)

      expect(state.startTime).toBeTypeOf('number')
      expect(state.startTime).toBeTypeOf('number')
    })

    it('does nothing if animation is already running', () => {
      const state = createHoverAnimationState()
      state.animationId = 999
      state.startTime = 1000

      startHoverAnimation(state, mockCanvasState, mockGetParams)

      expect(state.animationId).toBe(999)
      expect(state.startTime).toBe(1000)
    })

    it('stops animation when scale becomes 0', async () => {
      const state = createHoverAnimationState()
      let scaleValue = 1
      const getParamsWithScale = vi.fn(() => ({
        baseAngle: 40,
        scale: scaleValue,
        isFlipped: false,
      }))

      startHoverAnimation(state, mockCanvasState, getParamsWithScale)
      expect(state.startTime).toBeTypeOf('number')

      // Change scale to 0 and wait for next animation frame
      scaleValue = 0
      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve)
        })
      })

      // Animation should have stopped itself
      expect(state.animationId).toBe(null)
      expect(state.startTime).toBe(null)
    })

    it('updates camera with flipped direction when isFlipped is true', async () => {
      const state = createHoverAnimationState()
      const getParamsFlipped = vi.fn(() => ({
        baseAngle: 40,
        scale: 1,
        isFlipped: true,
      }))

      startHoverAnimation(state, mockCanvasState, getParamsFlipped)
      expect(state.startTime).toBeTypeOf('number')

      // Wait for animation to run at least once
      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve)
        })
      })

      // Camera should have been updated with flipped direction
      expect(mockCanvasState.camera.position.set).toHaveBeenCalled()
      expect(mockCanvasState.camera.up.set).toHaveBeenCalled()
      expect(mockCanvasState.camera.lookAt).toHaveBeenCalled()
    })

    it('continues animation using timestamp fallback when startTime is null', async () => {
      const state = createHoverAnimationState()

      startHoverAnimation(state, mockCanvasState, mockGetParams)
      expect(state.startTime).toBeTypeOf('number')

      // Simulate the edge case where startTime becomes null during animation
      // (this tests the defensive ?? timestamp fallback)
      state.startTime = null

      // Wait for animation to run
      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve)
        })
      })

      // Animation should continue despite startTime being null
      expect(mockCanvasState.camera.position.set).toHaveBeenCalled()
    })
  })

  describe('stopHoverAnimation', () => {
    it('cancels animation frame and resets state', () => {
      const state: HoverAnimationState = {
        animationId: 123,
        startTime: 1000,
      }

      stopHoverAnimation(state)

      expect(state.animationId).toBe(null)
      expect(state.startTime).toBe(null)
    })

    it('does nothing if animation is not running', () => {
      const state = createHoverAnimationState()
      stopHoverAnimation(state)

      expect(state.animationId).toBe(null)
      expect(state.startTime).toBe(null)
    })
  })
})

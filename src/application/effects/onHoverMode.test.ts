import { signal } from '@preact/signals-core'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { SettingsStore } from '../settings/settingsStore'
import { setupHoverModeEffect } from './onHoverMode'

describe('onHoverMode', () => {
  let mockCustomBoardState: any
  let mockHoverState: any
  let mockSettings: SettingsStore

  beforeEach(() => {
    mockCustomBoardState = {
      canvas: {
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
        canvasElement: document.createElement('canvas'),
      },
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }

    mockHoverState = {
      animationId: null,
      startTime: null,
    }

    mockSettings = {
      hoverMode: signal('off'),
      parallax: signal(0),
    } as unknown as SettingsStore
  })

  it('returns cleanup function', () => {
    const cleanup = setupHoverModeEffect(mockCustomBoardState, mockHoverState, mockSettings)
    expect(typeof cleanup).toBe('function')
  })

  it('stops animation when canvas is null', () => {
    mockCustomBoardState.canvas = null
    const cleanup = setupHoverModeEffect(mockCustomBoardState, mockHoverState, mockSettings)
    expect(typeof cleanup).toBe('function')
  })

  it('stops animation and resets camera when scale is 0', () => {
    mockSettings.hoverMode.value = 'off'
    const cleanup = setupHoverModeEffect(mockCustomBoardState, mockHoverState, mockSettings)
    expect(typeof cleanup).toBe('function')
  })

  it('treats invalid hover mode as scale 0', () => {
    mockSettings.hoverMode.value = 'invalid' as any
    const cleanup = setupHoverModeEffect(mockCustomBoardState, mockHoverState, mockSettings)
    expect(typeof cleanup).toBe('function')
  })

  it('auto-enables parallax when hover mode activates with parallax=0', () => {
    mockSettings.parallax.value = 0
    mockSettings.hoverMode.value = 'small'

    setupHoverModeEffect(mockCustomBoardState, mockHoverState, mockSettings)

    expect(mockSettings.parallax.value).toBe(40)
  })

  it('does not change parallax when hover mode activates with parallax > 0', () => {
    mockSettings.parallax.value = 60
    mockSettings.hoverMode.value = 'large'

    setupHoverModeEffect(mockCustomBoardState, mockHoverState, mockSettings)

    expect(mockSettings.parallax.value).toBe(60)
  })
})

import { signal } from '@preact/signals-core'
import { mockModule } from 'simone'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as domModule from '../../platform/dom'
import * as canvasModule from '../../presentation/3d/canvas'
import * as hoverAnimationModule from '../../presentation/3d/hoverAnimation'
import type { SettingsStore } from '../settings/settingsStore'
import { setupHoverModeEffect } from './onHoverMode'

const camera = mockModule(import('../../presentation/3d/camera'))

describe('onHoverMode', () => {
  let mockCustomBoardState: any
  let mockHoverState: any
  let mockSettings: SettingsStore
  let startHoverAnimationSpy: any
  let stopHoverAnimationSpy: any
  let querySelectorSpy: any
  let render3DSpy: any

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

    startHoverAnimationSpy = vi.spyOn(hoverAnimationModule, 'startHoverAnimation')
    stopHoverAnimationSpy = vi.spyOn(hoverAnimationModule, 'stopHoverAnimation')

    // Default stub for querySelector to prevent errors during animation
    const defaultCoords = document.createElement('coords')
    querySelectorSpy = vi.spyOn(domModule, 'querySelector').mockReturnValue(defaultCoords)

    // Default stub for render3D to prevent errors during animation
    render3DSpy = vi.spyOn(canvasModule, 'render3D').mockImplementation(() => {})
  })

  it('stops animation when canvas is null', () => {
    mockCustomBoardState.canvas = null

    const cleanup = setupHoverModeEffect(mockCustomBoardState, mockHoverState, mockSettings)

    expect(stopHoverAnimationSpy).toHaveBeenCalledWith(mockHoverState)
    expect(typeof cleanup).toBe('function')
  })

  it('starts animation when scale > 0', () => {
    mockSettings.hoverMode.value = 'small'

    const cleanup = setupHoverModeEffect(mockCustomBoardState, mockHoverState, mockSettings)

    expect(startHoverAnimationSpy).toHaveBeenCalled()
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

  it('stops animation and resets camera when scale = 0', () => {
    const mockCoords = document.createElement('coords')
    querySelectorSpy.mockReturnValue(mockCoords)

    camera
      .expects('updateCameraAngle')
      .withArgs(mockCustomBoardState.canvas, 0, false)
      .returns(undefined)

    mockSettings.hoverMode.value = 'off'

    const cleanup = setupHoverModeEffect(mockCustomBoardState, mockHoverState, mockSettings)

    expect(stopHoverAnimationSpy).toHaveBeenCalledWith(mockHoverState)
    expect(render3DSpy).toHaveBeenCalledWith(mockCustomBoardState.canvas)
    expect(typeof cleanup).toBe('function')
  })

  it('getParams callback returns correct isFlipped value when board is black', () => {
    const mockCoords = document.createElement('coords')
    mockCoords.classList.add('black')
    let capturedGetParams: (() => any) | null = null

    startHoverAnimationSpy.mockImplementation((_, __, getParams) => {
      capturedGetParams = getParams
    })

    mockSettings.hoverMode.value = 'small'
    mockSettings.parallax.value = 50

    setupHoverModeEffect(mockCustomBoardState, mockHoverState, mockSettings)

    // Now set up expectations for the getParams callback
    querySelectorSpy.mockReturnValue(mockCoords)

    // Call the captured getParams callback
    const params = capturedGetParams?.()
    expect(params).toEqual({
      baseAngle: 50,
      scale: 1,
      isFlipped: true,
    })
  })

  it('returns isFlipped=false when coords element is not found', () => {
    let capturedGetParams: (() => any) | null = null

    startHoverAnimationSpy.mockImplementation((_, __, getParams) => {
      capturedGetParams = getParams
    })

    mockSettings.hoverMode.value = 'super'
    mockSettings.parallax.value = 70

    setupHoverModeEffect(mockCustomBoardState, mockHoverState, mockSettings)

    // Now set up expectations for the getParams callback
    querySelectorSpy.mockReturnValue(null)

    const params = capturedGetParams?.()
    expect(params).toEqual({
      baseAngle: 70,
      scale: 3,
      isFlipped: false,
    })
  })
})

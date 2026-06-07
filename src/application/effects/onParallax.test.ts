import { signal } from '@preact/signals-core'
import { mockModule } from 'simone'
import { describe, it } from 'vitest'
import type { CustomBoardState } from '../handlers/handleCustomBoard'
import type { SettingsStore } from '../settings/settingsStore'
import { setupParallaxEffect } from './onParallax'

const domModule = mockModule(import('../../platform/dom'))
const cameraModule = mockModule(import('../../presentation/3d/camera'))
const canvasModule = mockModule(import('../../presentation/3d/canvas'))

describe('onParallax effect', () => {
  it('does nothing when canvas is null', () => {
    const state = {
      canvas: null,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      parallax: signal(45),
    } as unknown as SettingsStore

    // Should not call updateCameraAngle or render3D
    const cleanup = setupParallaxEffect(state as CustomBoardState, settings)

    cleanup()
  })

  it('updates camera angle and renders when canvas exists (non-flipped)', () => {
    const mockCanvas = { scene: {}, camera: {} } as any
    const state = {
      canvas: mockCanvas,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      parallax: signal(45),
    } as unknown as SettingsStore

    const mockCoords = document.createElement('coords')
    domModule.expects('querySelector').withArgs('coords').returns(mockCoords)
    cameraModule.expects('updateCameraAngle').withArgs(mockCanvas, 45, false).returns(undefined)
    canvasModule.expects('render3D').withArgs(mockCanvas).returns(undefined)

    const cleanup = setupParallaxEffect(state as CustomBoardState, settings)

    cleanup()
  })

  it('updates camera angle with flipped orientation when coords has black class', () => {
    const mockCanvas = { scene: {}, camera: {} } as any
    const state = {
      canvas: mockCanvas,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      parallax: signal(30),
    } as unknown as SettingsStore

    const mockCoords = document.createElement('coords')
    mockCoords.classList.add('black')
    domModule.expects('querySelector').withArgs('coords').returns(mockCoords)
    cameraModule.expects('updateCameraAngle').withArgs(mockCanvas, 30, true).returns(undefined)
    canvasModule.expects('render3D').withArgs(mockCanvas).returns(undefined)

    const cleanup = setupParallaxEffect(state as CustomBoardState, settings)

    cleanup()
  })

  it('reacts to parallax changes', () => {
    const mockCanvas = { scene: {}, camera: {} } as any
    const state = {
      canvas: mockCanvas,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      parallax: signal(45),
    } as unknown as SettingsStore

    const mockCoords = document.createElement('coords')
    domModule.expects('querySelector').withArgs('coords').returns(mockCoords)
    cameraModule.expects('updateCameraAngle').withArgs(mockCanvas, 45, false).returns(undefined)
    canvasModule.expects('render3D').withArgs(mockCanvas).returns(undefined)

    const cleanup = setupParallaxEffect(state as CustomBoardState, settings)

    domModule.expects('querySelector').withArgs('coords').returns(mockCoords)
    cameraModule.expects('updateCameraAngle').withArgs(mockCanvas, 60, false).returns(undefined)
    canvasModule.expects('render3D').withArgs(mockCanvas).returns(undefined)

    settings.parallax.value = 60

    cleanup()
  })

  it('defaults to non-flipped orientation when coords element is missing', () => {
    const mockCanvas = { scene: {}, camera: {} } as any
    const state = {
      canvas: mockCanvas,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      parallax: signal(45),
    } as unknown as SettingsStore

    domModule.expects('querySelector').withArgs('coords').returns(null)
    cameraModule.expects('updateCameraAngle').withArgs(mockCanvas, 45, false).returns(undefined)
    canvasModule.expects('render3D').withArgs(mockCanvas).returns(undefined)

    const cleanup = setupParallaxEffect(state as CustomBoardState, settings)

    cleanup()
  })
})

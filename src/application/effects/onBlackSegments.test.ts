import { signal } from '@preact/signals-core'
import { mockModule } from 'simone'
import { describe, expect, it } from 'vitest'
import type { THREE } from '../../platform/three'
import type { Canvas3DState } from '../../presentation/3d/canvas'
import type { BlackSegmentsState } from '../handlers/handleBlackSegments'
import type { CustomBoardState } from '../handlers/handleCustomBoard'
import type { SettingsStore } from '../settings/settingsStore'
import { setupBlackSegmentsEffect } from './onBlackSegments'

const handleBlackSegments = mockModule(import('../handlers/handleBlackSegments'))

describe('setupBlackSegmentsEffect', () => {
  it('stops interval when obfuscations disabled', () => {
    const segState: BlackSegmentsState = { counter: 0, intervalId: null }
    const mockCanvas: Canvas3DState = {
      scene: {} as THREE.Scene,
      camera: {} as THREE.PerspectiveCamera,
      renderer: {} as THREE.WebGLRenderer,
      canvasElement: document.createElement('canvas'),
    }
    const customBoardState: CustomBoardState = {
      canvas: mockCanvas,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      blackSegments: signal('1/4'),
      blackSegmentsTiming: signal('rotate-10s'),
      obfuscationsEnabled: signal(false),
    } as unknown as SettingsStore

    handleBlackSegments.expects('stopBlackSegmentsInterval').withArgs(segState).returns(undefined)
    handleBlackSegments
      .expects('applyBlackSegments')
      .withArgs(segState, customBoardState, settings)
      .returns(undefined)

    const cleanup = setupBlackSegmentsEffect(segState, customBoardState, settings)

    expect(typeof cleanup).toBe('function')
  })

  it('stops interval when mode is none', () => {
    const segState: BlackSegmentsState = { counter: 0, intervalId: null }
    const mockCanvas: Canvas3DState = {
      scene: {} as THREE.Scene,
      camera: {} as THREE.PerspectiveCamera,
      renderer: {} as THREE.WebGLRenderer,
      canvasElement: document.createElement('canvas'),
    }
    const customBoardState: CustomBoardState = {
      canvas: mockCanvas,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      blackSegments: signal('none'),
      blackSegmentsTiming: signal('rotate-10s'),
      obfuscationsEnabled: signal(true),
    } as unknown as SettingsStore

    handleBlackSegments.expects('stopBlackSegmentsInterval').withArgs(segState).returns(undefined)
    handleBlackSegments
      .expects('applyBlackSegments')
      .withArgs(segState, customBoardState, settings)
      .returns(undefined)

    const cleanup = setupBlackSegmentsEffect(segState, customBoardState, settings)

    expect(typeof cleanup).toBe('function')
  })

  it('stops interval when canvas is null', () => {
    const segState: BlackSegmentsState = { counter: 0, intervalId: null }
    const customBoardState: CustomBoardState = {
      canvas: null,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      blackSegments: signal('1/4'),
      blackSegmentsTiming: signal('rotate-10s'),
      obfuscationsEnabled: signal(true),
    } as unknown as SettingsStore

    handleBlackSegments.expects('stopBlackSegmentsInterval').withArgs(segState).returns(undefined)

    const cleanup = setupBlackSegmentsEffect(segState, customBoardState, settings)

    expect(typeof cleanup).toBe('function')
  })

  it('applies and starts interval when conditions are met', () => {
    const segState: BlackSegmentsState = { counter: 0, intervalId: null }
    const mockCanvas: Canvas3DState = {
      scene: {} as THREE.Scene,
      camera: {} as THREE.PerspectiveCamera,
      renderer: {} as THREE.WebGLRenderer,
      canvasElement: document.createElement('canvas'),
    }
    const customBoardState: CustomBoardState = {
      canvas: mockCanvas,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      blackSegments: signal('1/4'),
      blackSegmentsTiming: signal('rotate-10s'),
      obfuscationsEnabled: signal(true),
    } as unknown as SettingsStore

    handleBlackSegments
      .expects('applyBlackSegments')
      .withArgs(segState, customBoardState, settings)
      .returns(undefined)
    handleBlackSegments
      .expects('startBlackSegmentsInterval')
      .withArgs(segState, customBoardState, settings)
      .returns(undefined)

    const cleanup = setupBlackSegmentsEffect(segState, customBoardState, settings)

    expect(typeof cleanup).toBe('function')
  })

  it('reacts when blackSegments signal changes', () => {
    const segState: BlackSegmentsState = { counter: 0, intervalId: null }
    const mockCanvas: Canvas3DState = {
      scene: {} as THREE.Scene,
      camera: {} as THREE.PerspectiveCamera,
      renderer: {} as THREE.WebGLRenderer,
      canvasElement: document.createElement('canvas'),
    }
    const customBoardState: CustomBoardState = {
      canvas: mockCanvas,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      blackSegments: signal('1/4'),
      blackSegmentsTiming: signal('rotate-10s'),
      obfuscationsEnabled: signal(true),
    } as unknown as SettingsStore

    handleBlackSegments
      .expects('applyBlackSegments')
      .withArgs(segState, customBoardState, settings)
      .returns(undefined)
    handleBlackSegments
      .expects('startBlackSegmentsInterval')
      .withArgs(segState, customBoardState, settings)
      .returns(undefined)

    setupBlackSegmentsEffect(segState, customBoardState, settings)

    // Change to none mode
    handleBlackSegments.expects('stopBlackSegmentsInterval').withArgs(segState).returns(undefined)
    handleBlackSegments
      .expects('applyBlackSegments')
      .withArgs(segState, customBoardState, settings)
      .returns(undefined)

    settings.blackSegments.value = 'none'
  })

  it('reacts when blackSegmentsTiming signal changes', () => {
    const segState: BlackSegmentsState = { counter: 0, intervalId: null }
    const mockCanvas: Canvas3DState = {
      scene: {} as THREE.Scene,
      camera: {} as THREE.PerspectiveCamera,
      renderer: {} as THREE.WebGLRenderer,
      canvasElement: document.createElement('canvas'),
    }
    const customBoardState: CustomBoardState = {
      canvas: mockCanvas,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      blackSegments: signal('1/4'),
      blackSegmentsTiming: signal('rotate-10s'),
      obfuscationsEnabled: signal(true),
    } as unknown as SettingsStore

    handleBlackSegments
      .expects('applyBlackSegments')
      .withArgs(segState, customBoardState, settings)
      .returns(undefined)
    handleBlackSegments
      .expects('startBlackSegmentsInterval')
      .withArgs(segState, customBoardState, settings)
      .returns(undefined)

    setupBlackSegmentsEffect(segState, customBoardState, settings)

    // Change timing
    handleBlackSegments
      .expects('applyBlackSegments')
      .withArgs(segState, customBoardState, settings)
      .returns(undefined)
    handleBlackSegments
      .expects('startBlackSegmentsInterval')
      .withArgs(segState, customBoardState, settings)
      .returns(undefined)

    settings.blackSegmentsTiming.value = 'rotate-30s'
  })

  it('reacts when obfuscationsEnabled signal changes', () => {
    const segState: BlackSegmentsState = { counter: 0, intervalId: null }
    const mockCanvas: Canvas3DState = {
      scene: {} as THREE.Scene,
      camera: {} as THREE.PerspectiveCamera,
      renderer: {} as THREE.WebGLRenderer,
      canvasElement: document.createElement('canvas'),
    }
    const customBoardState: CustomBoardState = {
      canvas: mockCanvas,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      blackSegments: signal('1/4'),
      blackSegmentsTiming: signal('rotate-10s'),
      obfuscationsEnabled: signal(false),
    } as unknown as SettingsStore

    handleBlackSegments.expects('stopBlackSegmentsInterval').withArgs(segState).returns(undefined)
    handleBlackSegments
      .expects('applyBlackSegments')
      .withArgs(segState, customBoardState, settings)
      .returns(undefined)

    setupBlackSegmentsEffect(segState, customBoardState, settings)

    // Enable obfuscations
    handleBlackSegments
      .expects('applyBlackSegments')
      .withArgs(segState, customBoardState, settings)
      .returns(undefined)
    handleBlackSegments
      .expects('startBlackSegmentsInterval')
      .withArgs(segState, customBoardState, settings)
      .returns(undefined)

    settings.obfuscationsEnabled.value = true
  })
})

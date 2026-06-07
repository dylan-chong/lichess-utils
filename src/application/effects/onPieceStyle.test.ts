import { signal } from '@preact/signals-core'
import { mockModule } from 'simone'
import { describe, expect, it } from 'vitest'
import type { Canvas3DState } from '../../presentation/3d/canvas'
import type { PieceManagerState } from '../../presentation/3d/pieceManager'
import type { CustomBoardState } from '../handlers/handleCustomBoard'
import type { SettingsStore } from '../settings/settingsStore'
import { setupPieceStyleEffect } from './onPieceStyle'

const dom = mockModule(import('../../platform/dom'))
const canvas = mockModule(import('../../presentation/3d/canvas'))
const pieceManager = mockModule(import('../../presentation/3d/pieceManager'))

describe('setupPieceStyleEffect', () => {
  it('does nothing when canvas is null', () => {
    const mockCanvas: Canvas3DState | null = null
    const mockPieceManager: PieceManagerState = { meshes: [], meshMap: new Map() }
    const customBoardState: CustomBoardState = {
      canvas: mockCanvas,
      pieceManager: mockPieceManager,
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      pieceStyle: signal('3d'),
      obfuscationsEnabled: signal(false),
    } as unknown as SettingsStore

    const cleanup = setupPieceStyleEffect(customBoardState, settings)

    expect(typeof cleanup).toBe('function')
    // No calls should be made to clearAllPieces, updatePieces, or render3D
  })

  it('clears and updates pieces when canvas exists and style changes', () => {
    const mockCanvas: Canvas3DState = {
      scene: {} as THREE.Scene,
      camera: {} as THREE.PerspectiveCamera,
      renderer: {} as THREE.WebGLRenderer,
      canvasElement: document.createElement('canvas'),
    }
    const mockPieceManager: PieceManagerState = { meshes: [], meshMap: new Map() }
    const customBoardState: CustomBoardState = {
      canvas: mockCanvas,
      pieceManager: mockPieceManager,
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      pieceStyle: signal('3d'),
      obfuscationsEnabled: signal(false),
    } as unknown as SettingsStore

    const mockCoords = document.createElement('coords')
    dom.expects('querySelector').withArgs('coords').returns(mockCoords)
    pieceManager.expects('clearAllPieces').withArgs(mockCanvas, mockPieceManager).returns(undefined)
    pieceManager
      .expects('updatePieces')
      .withArgs(mockCanvas, mockPieceManager, '3d', false, [])
      .returns(undefined)
    canvas.expects('render3D').withArgs(mockCanvas).returns(undefined)

    setupPieceStyleEffect(customBoardState, settings)
  })

  it('uses flipped board orientation when coords has black class', () => {
    const mockCanvas: Canvas3DState = {
      scene: {} as THREE.Scene,
      camera: {} as THREE.PerspectiveCamera,
      renderer: {} as THREE.WebGLRenderer,
      canvasElement: document.createElement('canvas'),
    }
    const mockPieceManager: PieceManagerState = { meshes: [], meshMap: new Map() }
    const customBoardState: CustomBoardState = {
      canvas: mockCanvas,
      pieceManager: mockPieceManager,
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      pieceStyle: signal('3d'),
      obfuscationsEnabled: signal(false),
    } as unknown as SettingsStore

    const mockCoords = document.createElement('coords')
    mockCoords.classList.add('black')
    dom.expects('querySelector').withArgs('coords').returns(mockCoords)
    pieceManager.expects('clearAllPieces').withArgs(mockCanvas, mockPieceManager).returns(undefined)
    pieceManager
      .expects('updatePieces')
      .withArgs(mockCanvas, mockPieceManager, '3d', true, [])
      .returns(undefined)
    canvas.expects('render3D').withArgs(mockCanvas).returns(undefined)

    setupPieceStyleEffect(customBoardState, settings)
  })

  it('uses icons style when obfuscations disabled and style is not 3d', () => {
    const mockCanvas: Canvas3DState = {
      scene: {} as THREE.Scene,
      camera: {} as THREE.PerspectiveCamera,
      renderer: {} as THREE.WebGLRenderer,
      canvasElement: document.createElement('canvas'),
    }
    const mockPieceManager: PieceManagerState = { meshes: [], meshMap: new Map() }
    const customBoardState: CustomBoardState = {
      canvas: mockCanvas,
      pieceManager: mockPieceManager,
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      pieceStyle: signal('checker'),
      obfuscationsEnabled: signal(false),
    } as unknown as SettingsStore

    const mockCoords = document.createElement('coords')
    dom.expects('querySelector').withArgs('coords').returns(mockCoords)
    pieceManager.expects('clearAllPieces').withArgs(mockCanvas, mockPieceManager).returns(undefined)
    pieceManager
      .expects('updatePieces')
      .withArgs(mockCanvas, mockPieceManager, 'icons', false, [])
      .returns(undefined)
    canvas.expects('render3D').withArgs(mockCanvas).returns(undefined)

    setupPieceStyleEffect(customBoardState, settings)
  })

  it('uses 3d style when obfuscations disabled and style is 3d', () => {
    const mockCanvas: Canvas3DState = {
      scene: {} as THREE.Scene,
      camera: {} as THREE.PerspectiveCamera,
      renderer: {} as THREE.WebGLRenderer,
      canvasElement: document.createElement('canvas'),
    }
    const mockPieceManager: PieceManagerState = { meshes: [], meshMap: new Map() }
    const customBoardState: CustomBoardState = {
      canvas: mockCanvas,
      pieceManager: mockPieceManager,
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      pieceStyle: signal('3d'),
      obfuscationsEnabled: signal(false),
    } as unknown as SettingsStore

    const mockCoords = document.createElement('coords')
    dom.expects('querySelector').withArgs('coords').returns(mockCoords)
    pieceManager.expects('clearAllPieces').withArgs(mockCanvas, mockPieceManager).returns(undefined)
    pieceManager
      .expects('updatePieces')
      .withArgs(mockCanvas, mockPieceManager, '3d', false, [])
      .returns(undefined)
    canvas.expects('render3D').withArgs(mockCanvas).returns(undefined)

    setupPieceStyleEffect(customBoardState, settings)
  })

  it('uses pieceStyle directly when obfuscations enabled', () => {
    const mockCanvas: Canvas3DState = {
      scene: {} as THREE.Scene,
      camera: {} as THREE.PerspectiveCamera,
      renderer: {} as THREE.WebGLRenderer,
      canvasElement: document.createElement('canvas'),
    }
    const mockPieceManager: PieceManagerState = { meshes: [], meshMap: new Map() }
    const customBoardState: CustomBoardState = {
      canvas: mockCanvas,
      pieceManager: mockPieceManager,
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      pieceStyle: signal('checker'),
      obfuscationsEnabled: signal(true),
    } as unknown as SettingsStore

    const mockCoords = document.createElement('coords')
    dom.expects('querySelector').withArgs('coords').returns(mockCoords)
    pieceManager.expects('clearAllPieces').withArgs(mockCanvas, mockPieceManager).returns(undefined)
    pieceManager
      .expects('updatePieces')
      .withArgs(mockCanvas, mockPieceManager, 'checker', false, [])
      .returns(undefined)
    canvas.expects('render3D').withArgs(mockCanvas).returns(undefined)

    setupPieceStyleEffect(customBoardState, settings)
  })

  it('reacts when pieceStyle signal changes', () => {
    const mockCanvas: Canvas3DState = {
      scene: {} as THREE.Scene,
      camera: {} as THREE.PerspectiveCamera,
      renderer: {} as THREE.WebGLRenderer,
      canvasElement: document.createElement('canvas'),
    }
    const mockPieceManager: PieceManagerState = { meshes: [], meshMap: new Map() }
    const customBoardState: CustomBoardState = {
      canvas: mockCanvas,
      pieceManager: mockPieceManager,
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      pieceStyle: signal('3d'),
      obfuscationsEnabled: signal(true),
    } as unknown as SettingsStore

    const mockCoords = document.createElement('coords')
    dom.expects('querySelector').withArgs('coords').returns(mockCoords)
    pieceManager.expects('clearAllPieces').withArgs(mockCanvas, mockPieceManager).returns(undefined)
    pieceManager
      .expects('updatePieces')
      .withArgs(mockCanvas, mockPieceManager, '3d', false, [])
      .returns(undefined)
    canvas.expects('render3D').withArgs(mockCanvas).returns(undefined)

    setupPieceStyleEffect(customBoardState, settings)

    // Change pieceStyle
    dom.expects('querySelector').withArgs('coords').returns(mockCoords)
    pieceManager.expects('clearAllPieces').withArgs(mockCanvas, mockPieceManager).returns(undefined)
    pieceManager
      .expects('updatePieces')
      .withArgs(mockCanvas, mockPieceManager, 'checker', false, [])
      .returns(undefined)
    canvas.expects('render3D').withArgs(mockCanvas).returns(undefined)

    settings.pieceStyle.value = 'checker'
  })

  it('reacts when obfuscationsEnabled signal changes', () => {
    const mockCanvas: Canvas3DState = {
      scene: {} as THREE.Scene,
      camera: {} as THREE.PerspectiveCamera,
      renderer: {} as THREE.WebGLRenderer,
      canvasElement: document.createElement('canvas'),
    }
    const mockPieceManager: PieceManagerState = { meshes: [], meshMap: new Map() }
    const customBoardState: CustomBoardState = {
      canvas: mockCanvas,
      pieceManager: mockPieceManager,
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      pieceStyle: signal('checker'),
      obfuscationsEnabled: signal(false),
    } as unknown as SettingsStore

    const mockCoords = document.createElement('coords')
    dom.expects('querySelector').withArgs('coords').returns(mockCoords)
    pieceManager.expects('clearAllPieces').withArgs(mockCanvas, mockPieceManager).returns(undefined)
    pieceManager
      .expects('updatePieces')
      .withArgs(mockCanvas, mockPieceManager, 'icons', false, [])
      .returns(undefined)
    canvas.expects('render3D').withArgs(mockCanvas).returns(undefined)

    setupPieceStyleEffect(customBoardState, settings)

    // Enable obfuscations
    dom.expects('querySelector').withArgs('coords').returns(mockCoords)
    pieceManager.expects('clearAllPieces').withArgs(mockCanvas, mockPieceManager).returns(undefined)
    pieceManager
      .expects('updatePieces')
      .withArgs(mockCanvas, mockPieceManager, 'checker', false, [])
      .returns(undefined)
    canvas.expects('render3D').withArgs(mockCanvas).returns(undefined)

    settings.obfuscationsEnabled.value = true
  })

  it('defaults to non-flipped orientation when coords element is missing', () => {
    const mockCanvas: Canvas3DState = {
      scene: {} as THREE.Scene,
      camera: {} as THREE.PerspectiveCamera,
      renderer: {} as THREE.WebGLRenderer,
      canvasElement: document.createElement('canvas'),
    }
    const mockPieceManager: PieceManagerState = { meshes: [], meshMap: new Map() }
    const customBoardState: CustomBoardState = {
      canvas: mockCanvas,
      pieceManager: mockPieceManager,
      boardPlaneName: 'boardPlane',
    }
    const settings = {
      pieceStyle: signal('3d'),
      obfuscationsEnabled: signal(false),
    } as unknown as SettingsStore

    dom.expects('querySelector').withArgs('coords').returns(null)
    pieceManager.expects('clearAllPieces').withArgs(mockCanvas, mockPieceManager).returns(undefined)
    pieceManager
      .expects('updatePieces')
      .withArgs(mockCanvas, mockPieceManager, '3d', false, [])
      .returns(undefined)
    canvas.expects('render3D').withArgs(mockCanvas).returns(undefined)

    setupPieceStyleEffect(customBoardState, settings)
  })
})

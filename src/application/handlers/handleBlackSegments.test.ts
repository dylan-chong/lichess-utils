import { signal } from '@preact/signals-core'
import { mockModule } from 'simone'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { THREE } from '../../platform/three'
import type { Canvas3DState } from '../../presentation/3d/canvas'
import type { PieceManagerState } from '../../presentation/3d/pieceManager'
import type { SettingsStore } from '../settings/settingsStore'
import {
  type BlackSegmentsState,
  applyBlackSegments,
  createBlackSegmentsState,
  startBlackSegmentsInterval,
  stopBlackSegmentsInterval,
} from './handleBlackSegments'
import type { CustomBoardState } from './handleCustomBoard'

const dom = mockModule(import('../../platform/dom'))
const boardPlane = mockModule(import('../../presentation/3d/boardPlane'))
const canvas = mockModule(import('../../presentation/3d/canvas'))
const pieceManager = mockModule(import('../../presentation/3d/pieceManager'))

describe('handleBlackSegments', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('createBlackSegmentsState', () => {
    it('returns state with counter 0 and null interval', () => {
      const state = createBlackSegmentsState()
      expect(state.counter).toBe(0)
      expect(state.intervalId).toBe(null)
    })
  })

  describe('stopBlackSegmentsInterval', () => {
    it('clears interval and sets to null', () => {
      const state: BlackSegmentsState = { counter: 0, intervalId: setInterval(() => {}, 1000) }
      const intervalId = state.intervalId

      stopBlackSegmentsInterval(state)

      expect(state.intervalId).toBe(null)
      expect(intervalId).not.toBe(null)
    })

    it('does nothing when interval is already null', () => {
      const state: BlackSegmentsState = { counter: 0, intervalId: null }

      stopBlackSegmentsInterval(state)

      expect(state.intervalId).toBe(null)
    })
  })

  describe('startBlackSegmentsInterval', () => {
    it('does not set interval when timing is null', () => {
      const state = createBlackSegmentsState()
      const customBoardState: CustomBoardState = {
        canvas: null,
        pieceManager: { meshes: [], meshMap: new Map() },
        boardPlaneName: 'boardPlane',
      }
      const settings = {
        blackSegmentsTiming: signal('dont-rotate'),
      } as unknown as SettingsStore

      startBlackSegmentsInterval(state, customBoardState, settings)

      expect(state.intervalId).toBe(null)
    })

    it('sets interval with correct timing', () => {
      const state = createBlackSegmentsState()
      const mockCanvas: Canvas3DState = {
        scene: {
          getObjectByName: () => null,
          remove: () => {},
          add: () => {},
        } as unknown as THREE.Scene,
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
        blackSegmentsTiming: signal('rotate-10s'),
        blackSegments: signal('1/4'),
        obfuscationsEnabled: signal(true),
        pieceStyle: signal('icons'),
      } as unknown as SettingsStore

      startBlackSegmentsInterval(state, customBoardState, settings)

      expect(state.intervalId).not.toBe(null)
    })

    it('increments counter and applies black segments on interval', () => {
      const state = createBlackSegmentsState()
      const mockScene = {
        getObjectByName: vi.fn(() => null),
        remove: vi.fn(),
        add: vi.fn(),
      } as unknown as THREE.Scene
      const mockCanvas: Canvas3DState = {
        scene: mockScene,
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
        blackSegmentsTiming: signal('rotate-10s'),
        blackSegments: signal('1/4'),
        obfuscationsEnabled: signal(true),
        pieceStyle: signal('icons'),
      } as unknown as SettingsStore

      const mockBoardPlane = { name: '' } as THREE.Group
      const mockCoords = document.createElement('coords')

      startBlackSegmentsInterval(state, customBoardState, settings)

      expect(state.counter).toBe(0)

      boardPlane.expects('createBoardPlane').withArgs([1]).returns(mockBoardPlane)
      dom.expects('querySelector').withArgs('coords').returns(mockCoords)
      pieceManager
        .expects('updatePieces')
        .withArgs(mockCanvas, mockPieceManager, 'icons', false, [1])
        .returns(undefined)
      canvas.expects('render3D').withArgs(mockCanvas).returns(undefined)

      vi.advanceTimersByTime(10000)

      expect(state.counter).toBe(1)
    })

    it('stops existing interval before starting new one', () => {
      const state = createBlackSegmentsState()
      const mockCanvas: Canvas3DState = {
        scene: {
          getObjectByName: () => null,
          remove: () => {},
          add: () => {},
        } as unknown as THREE.Scene,
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
        blackSegmentsTiming: signal('rotate-10s'),
        blackSegments: signal('1/4'),
        obfuscationsEnabled: signal(true),
        pieceStyle: signal('icons'),
      } as unknown as SettingsStore

      startBlackSegmentsInterval(state, customBoardState, settings)
      const firstIntervalId = state.intervalId

      startBlackSegmentsInterval(state, customBoardState, settings)

      expect(state.intervalId).not.toBe(firstIntervalId)
    })
  })

  describe('applyBlackSegments', () => {
    it('does nothing when canvas is null', () => {
      const state = createBlackSegmentsState()
      const customBoardState: CustomBoardState = {
        canvas: null,
        pieceManager: { meshes: [], meshMap: new Map() },
        boardPlaneName: 'boardPlane',
      }
      const settings = {
        blackSegments: signal('1/4'),
        obfuscationsEnabled: signal(true),
        pieceStyle: signal('icons'),
      } as unknown as SettingsStore

      applyBlackSegments(state, customBoardState, settings)

      // No calls should be made
    })

    it('rebuilds board plane and updates pieces when canvas exists', () => {
      const state: BlackSegmentsState = { counter: 2, intervalId: null }
      const existingBoard = { name: 'boardPlane' } as THREE.Group
      const mockScene = {
        getObjectByName: vi.fn(() => existingBoard),
        remove: vi.fn(),
        add: vi.fn(),
      } as unknown as THREE.Scene
      const mockCanvas: Canvas3DState = {
        scene: mockScene,
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
        blackSegments: signal('1/4'),
        obfuscationsEnabled: signal(true),
        pieceStyle: signal('icons'),
      } as unknown as SettingsStore

      const mockBoardPlane = { name: '' } as THREE.Group
      const mockCoords = document.createElement('coords')
      boardPlane.expects('createBoardPlane').withArgs([2]).returns(mockBoardPlane)
      dom.expects('querySelector').withArgs('coords').returns(mockCoords)
      pieceManager
        .expects('updatePieces')
        .withArgs(mockCanvas, mockPieceManager, 'icons', false, [2])
        .returns(undefined)
      canvas.expects('render3D').withArgs(mockCanvas).returns(undefined)

      applyBlackSegments(state, customBoardState, settings)

      expect(mockScene.getObjectByName).toHaveBeenCalledWith('boardPlane')
      expect(mockScene.remove).toHaveBeenCalledWith(existingBoard)
      expect(mockScene.add).toHaveBeenCalledWith(mockBoardPlane)
    })

    it('uses flipped orientation when coords has black class', () => {
      const state: BlackSegmentsState = { counter: 0, intervalId: null }
      const mockScene = {
        getObjectByName: vi.fn(() => null),
        remove: vi.fn(),
        add: vi.fn(),
      } as unknown as THREE.Scene
      const mockCanvas: Canvas3DState = {
        scene: mockScene,
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
        blackSegments: signal('none'),
        obfuscationsEnabled: signal(false),
        pieceStyle: signal('checker'),
      } as unknown as SettingsStore

      const mockBoardPlane = { name: '' } as THREE.Group
      const mockCoords = document.createElement('coords')
      mockCoords.classList.add('black')
      boardPlane.expects('createBoardPlane').withArgs([]).returns(mockBoardPlane)
      dom.expects('querySelector').withArgs('coords').returns(mockCoords)
      pieceManager
        .expects('updatePieces')
        .withArgs(mockCanvas, mockPieceManager, 'icons', true, [])
        .returns(undefined)
      canvas.expects('render3D').withArgs(mockCanvas).returns(undefined)

      applyBlackSegments(state, customBoardState, settings)
    })

    it('uses piece style from settings when obfuscations enabled', () => {
      const state: BlackSegmentsState = { counter: 0, intervalId: null }
      const mockScene = {
        getObjectByName: vi.fn(() => null),
        remove: vi.fn(),
        add: vi.fn(),
      } as unknown as THREE.Scene
      const mockCanvas: Canvas3DState = {
        scene: mockScene,
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
        blackSegments: signal('none'),
        obfuscationsEnabled: signal(true),
        pieceStyle: signal('checker'),
      } as unknown as SettingsStore

      const mockBoardPlane = { name: '' } as THREE.Group
      const mockCoords = document.createElement('coords')
      boardPlane.expects('createBoardPlane').withArgs([]).returns(mockBoardPlane)
      dom.expects('querySelector').withArgs('coords').returns(mockCoords)
      pieceManager
        .expects('updatePieces')
        .withArgs(mockCanvas, mockPieceManager, 'checker', false, [])
        .returns(undefined)
      canvas.expects('render3D').withArgs(mockCanvas).returns(undefined)

      applyBlackSegments(state, customBoardState, settings)
    })

    it('defaults to non-flipped when coords element is null', () => {
      const state: BlackSegmentsState = { counter: 0, intervalId: null }
      const mockScene = {
        getObjectByName: vi.fn(() => null),
        remove: vi.fn(),
        add: vi.fn(),
      } as unknown as THREE.Scene
      const mockCanvas: Canvas3DState = {
        scene: mockScene,
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
        blackSegments: signal('none'),
        obfuscationsEnabled: signal(false),
        pieceStyle: signal('checker'),
      } as unknown as SettingsStore

      const mockBoardPlane = { name: '' } as THREE.Group
      boardPlane.expects('createBoardPlane').withArgs([]).returns(mockBoardPlane)
      dom.expects('querySelector').withArgs('coords').returns(null)
      pieceManager
        .expects('updatePieces')
        .withArgs(mockCanvas, mockPieceManager, 'icons', false, [])
        .returns(undefined)
      canvas.expects('render3D').withArgs(mockCanvas).returns(undefined)

      applyBlackSegments(state, customBoardState, settings)
    })
  })
})

import { signal } from '@preact/signals-core'
import { mockModule } from 'simone'
import { beforeEach, describe, expect, it } from 'vitest'
import type { SettingsStore } from '../settings/settingsStore'
import {
  createCustomBoardState,
  destroyCustomBoard,
  initCustomBoard,
  refreshPieces,
} from './handleCustomBoard'

const domModule = mockModule(import('../../platform/dom'))
const canvasModule = mockModule(import('../../presentation/3d/canvas'))
const boardPlaneModule = mockModule(import('../../presentation/3d/boardPlane'))
const pieceManagerModule = mockModule(import('../../presentation/3d/pieceManager'))

describe('handleCustomBoard', () => {
  let mockSettings: SettingsStore

  beforeEach(() => {
    mockSettings = {
      customBoardEnabled: signal(false),
      obfuscationsEnabled: signal(false),
      pieceStyle: signal('icons'),
    } as unknown as SettingsStore
  })

  describe('createCustomBoardState', () => {
    it('returns initial state with null canvas and empty piece manager', () => {
      const mockPieceManager = { meshes: [], meshMap: new Map() }
      pieceManagerModule.expects('createPieceManager').withArgs().returns(mockPieceManager)

      const state = createCustomBoardState()

      expect(state.canvas).toBeNull()
      expect(state.pieceManager).toBe(mockPieceManager)
      expect(state.boardPlaneName).toBe('boardPlane')
    })
  })

  describe('initCustomBoard', () => {
    it('returns early if canvas already exists', () => {
      const mockCanvas = { scene: { add: () => {} } }
      const mockPieceManager = { meshes: [], meshMap: new Map() }
      pieceManagerModule.expects('createPieceManager').withArgs().returns(mockPieceManager)

      const state = createCustomBoardState()
      state.canvas = mockCanvas as any

      initCustomBoard(state, mockSettings)

      // No expectations - should not call any module functions
    })

    it('creates canvas, adds board plane, updates pieces, and renders', () => {
      const mockPieceManager = { meshes: [], meshMap: new Map() }
      pieceManagerModule.expects('createPieceManager').withArgs().returns(mockPieceManager)

      const state = createCustomBoardState()
      const mockBoard = document.createElement('div')
      const mockPiece1 = document.createElement('piece')
      const mockPiece2 = document.createElement('piece')
      mockBoard.appendChild(mockPiece1)
      mockBoard.appendChild(mockPiece2)

      const mockScene = { add: () => {} }
      const mockCanvas = { scene: mockScene } as any
      const mockBoardPlane = { name: '' } as any
      const mockCoords = document.createElement('coords')

      domModule.expects('querySelector').withArgs('cg-board').returns(mockBoard)
      canvasModule.expects('create3DCanvas').withArgs().returns(mockCanvas)
      boardPlaneModule.expects('createBoardPlane').withArgs([]).returns(mockBoardPlane)
      domModule.expects('querySelector').withArgs('coords').returns(mockCoords)
      mockSettings.obfuscationsEnabled.value = false
      mockSettings.pieceStyle.value = 'icons'
      pieceManagerModule
        .expects('updatePieces')
        .withArgs(mockCanvas, state.pieceManager, 'icons', false, [])
        .returns(undefined)
      canvasModule.expects('render3D').withArgs(mockCanvas).returns(undefined)

      initCustomBoard(state, mockSettings)

      expect(mockBoard.style.opacity).toBe('0')
      expect((mockPiece1 as HTMLElement).style.visibility).toBe('hidden')
      expect((mockPiece2 as HTMLElement).style.visibility).toBe('hidden')
      expect(state.canvas).toBe(mockCanvas)
      expect(mockBoardPlane.name).toBe('boardPlane')
    })

    it('initializes custom board even when board element is not found', () => {
      const mockPieceManager = { meshes: [], meshMap: new Map() }
      pieceManagerModule.expects('createPieceManager').withArgs().returns(mockPieceManager)

      const state = createCustomBoardState()
      const mockScene = { add: () => {} }
      const mockCanvas = { scene: mockScene } as any
      const mockBoardPlane = { name: '' } as any
      const mockCoords = document.createElement('coords')

      domModule.expects('querySelector').withArgs('cg-board').returns(null)
      canvasModule.expects('create3DCanvas').withArgs().returns(mockCanvas)
      boardPlaneModule.expects('createBoardPlane').withArgs([]).returns(mockBoardPlane)
      domModule.expects('querySelector').withArgs('coords').returns(mockCoords)
      mockSettings.obfuscationsEnabled.value = false
      mockSettings.pieceStyle.value = '3d'
      pieceManagerModule
        .expects('updatePieces')
        .withArgs(mockCanvas, state.pieceManager, '3d', false, [])
        .returns(undefined)
      canvasModule.expects('render3D').withArgs(mockCanvas).returns(undefined)

      initCustomBoard(state, mockSettings)

      expect(state.canvas).toBe(mockCanvas)
    })

    it('detects flipped board from coords element with black class', () => {
      const mockPieceManager = { meshes: [], meshMap: new Map() }
      pieceManagerModule.expects('createPieceManager').withArgs().returns(mockPieceManager)

      const state = createCustomBoardState()
      const mockBoard = document.createElement('div')
      const mockScene = { add: () => {} }
      const mockCanvas = { scene: mockScene } as any
      const mockBoardPlane = { name: '' } as any
      const mockCoords = document.createElement('coords')
      mockCoords.classList.add('black')

      domModule.expects('querySelector').withArgs('cg-board').returns(mockBoard)
      canvasModule.expects('create3DCanvas').withArgs().returns(mockCanvas)
      boardPlaneModule.expects('createBoardPlane').withArgs([]).returns(mockBoardPlane)
      domModule.expects('querySelector').withArgs('coords').returns(mockCoords)
      mockSettings.obfuscationsEnabled.value = false
      mockSettings.pieceStyle.value = 'icons'
      pieceManagerModule
        .expects('updatePieces')
        .withArgs(mockCanvas, state.pieceManager, 'icons', true, [])
        .returns(undefined)
      canvasModule.expects('render3D').withArgs(mockCanvas).returns(undefined)

      initCustomBoard(state, mockSettings)
    })

    it('uses piece style directly when obfuscations are enabled', () => {
      const mockPieceManager = { meshes: [], meshMap: new Map() }
      pieceManagerModule.expects('createPieceManager').withArgs().returns(mockPieceManager)

      const state = createCustomBoardState()
      const mockBoard = document.createElement('div')
      const mockScene = { add: () => {} }
      const mockCanvas = { scene: mockScene } as any
      const mockBoardPlane = { name: '' } as any
      const mockCoords = document.createElement('coords')

      domModule.expects('querySelector').withArgs('cg-board').returns(mockBoard)
      canvasModule.expects('create3DCanvas').withArgs().returns(mockCanvas)
      boardPlaneModule.expects('createBoardPlane').withArgs([]).returns(mockBoardPlane)
      domModule.expects('querySelector').withArgs('coords').returns(mockCoords)
      mockSettings.obfuscationsEnabled.value = true
      mockSettings.pieceStyle.value = 'spheres'
      pieceManagerModule
        .expects('updatePieces')
        .withArgs(mockCanvas, state.pieceManager, 'spheres', false, [])
        .returns(undefined)
      canvasModule.expects('render3D').withArgs(mockCanvas).returns(undefined)

      initCustomBoard(state, mockSettings)
    })

    it('converts non-3d styles to icons when obfuscations are disabled', () => {
      const mockPieceManager = { meshes: [], meshMap: new Map() }
      pieceManagerModule.expects('createPieceManager').withArgs().returns(mockPieceManager)

      const state = createCustomBoardState()
      const mockBoard = document.createElement('div')
      const mockScene = { add: () => {} }
      const mockCanvas = { scene: mockScene } as any
      const mockBoardPlane = { name: '' } as any
      const mockCoords = document.createElement('coords')

      domModule.expects('querySelector').withArgs('cg-board').returns(mockBoard)
      canvasModule.expects('create3DCanvas').withArgs().returns(mockCanvas)
      boardPlaneModule.expects('createBoardPlane').withArgs([]).returns(mockBoardPlane)
      domModule.expects('querySelector').withArgs('coords').returns(mockCoords)
      mockSettings.obfuscationsEnabled.value = false
      mockSettings.pieceStyle.value = 'spheres'
      pieceManagerModule
        .expects('updatePieces')
        .withArgs(mockCanvas, state.pieceManager, 'icons', false, [])
        .returns(undefined)
      canvasModule.expects('render3D').withArgs(mockCanvas).returns(undefined)

      initCustomBoard(state, mockSettings)
    })
  })

  describe('destroyCustomBoard', () => {
    it('returns early if canvas is null', () => {
      const mockPieceManager = { meshes: [], meshMap: new Map() }
      pieceManagerModule.expects('createPieceManager').withArgs().returns(mockPieceManager)

      const state = createCustomBoardState()
      state.canvas = null

      destroyCustomBoard(state)

      // No expectations - should not call any module functions
    })

    it('clears pieces, destroys canvas, and restores board visibility', () => {
      const mockPieceManager = { meshes: [], meshMap: new Map() }
      pieceManagerModule.expects('createPieceManager').withArgs().returns(mockPieceManager)

      const state = createCustomBoardState()
      const mockCanvas = { scene: {} } as any
      state.canvas = mockCanvas

      const mockBoard = document.createElement('div')
      const mockPiece1 = document.createElement('piece')
      const mockPiece2 = document.createElement('piece')
      mockBoard.appendChild(mockPiece1)
      mockBoard.appendChild(mockPiece2)
      mockBoard.style.opacity = '0'
      ;(mockPiece1 as HTMLElement).style.visibility = 'hidden'
      ;(mockPiece2 as HTMLElement).style.visibility = 'hidden'

      pieceManagerModule
        .expects('clearAllPieces')
        .withArgs(mockCanvas, state.pieceManager)
        .returns(undefined)
      canvasModule.expects('destroy3DCanvas').withArgs(mockCanvas).returns(undefined)
      domModule.expects('querySelector').withArgs('cg-board').returns(mockBoard)

      destroyCustomBoard(state)

      expect(state.canvas).toBeNull()
      expect(mockBoard.style.opacity).toBe('')
      expect((mockPiece1 as HTMLElement).style.visibility).toBe('')
      expect((mockPiece2 as HTMLElement).style.visibility).toBe('')
    })

    it('destroys canvas and clears state even when board element is not found', () => {
      const mockPieceManager = { meshes: [], meshMap: new Map() }
      pieceManagerModule.expects('createPieceManager').withArgs().returns(mockPieceManager)

      const state = createCustomBoardState()
      const mockCanvas = { scene: {} } as any
      state.canvas = mockCanvas

      pieceManagerModule
        .expects('clearAllPieces')
        .withArgs(mockCanvas, state.pieceManager)
        .returns(undefined)
      canvasModule.expects('destroy3DCanvas').withArgs(mockCanvas).returns(undefined)
      domModule.expects('querySelector').withArgs('cg-board').returns(null)

      destroyCustomBoard(state)

      expect(state.canvas).toBeNull()
    })
  })

  describe('refreshPieces', () => {
    it('returns early if canvas is null', () => {
      const mockPieceManager = { meshes: [], meshMap: new Map() }
      pieceManagerModule.expects('createPieceManager').withArgs().returns(mockPieceManager)

      const state = createCustomBoardState()
      state.canvas = null

      refreshPieces(state, mockSettings)

      // No expectations - should not call any module functions
    })

    it('updates pieces and renders', () => {
      const mockPieceManager = { meshes: [], meshMap: new Map() }
      pieceManagerModule.expects('createPieceManager').withArgs().returns(mockPieceManager)

      const state = createCustomBoardState()
      const mockCanvas = { scene: {} } as any
      state.canvas = mockCanvas
      const mockCoords = document.createElement('coords')

      domModule.expects('querySelector').withArgs('coords').returns(mockCoords)
      mockSettings.obfuscationsEnabled.value = false
      mockSettings.pieceStyle.value = 'icons'
      pieceManagerModule
        .expects('updatePieces')
        .withArgs(mockCanvas, state.pieceManager, 'icons', false, [])
        .returns(undefined)
      canvasModule.expects('render3D').withArgs(mockCanvas).returns(undefined)

      refreshPieces(state, mockSettings)
    })

    it('detects flipped board when refreshing', () => {
      const mockPieceManager = { meshes: [], meshMap: new Map() }
      pieceManagerModule.expects('createPieceManager').withArgs().returns(mockPieceManager)

      const state = createCustomBoardState()
      const mockCanvas = { scene: {} } as any
      state.canvas = mockCanvas
      const mockCoords = document.createElement('coords')
      mockCoords.classList.add('black')

      domModule.expects('querySelector').withArgs('coords').returns(mockCoords)
      mockSettings.obfuscationsEnabled.value = false
      mockSettings.pieceStyle.value = '3d'
      pieceManagerModule
        .expects('updatePieces')
        .withArgs(mockCanvas, state.pieceManager, '3d', true, [])
        .returns(undefined)
      canvasModule.expects('render3D').withArgs(mockCanvas).returns(undefined)

      refreshPieces(state, mockSettings)
    })

    it('defaults to non-flipped orientation when coords element is not found', () => {
      const mockPieceManager = { meshes: [], meshMap: new Map() }
      pieceManagerModule.expects('createPieceManager').withArgs().returns(mockPieceManager)

      const state = createCustomBoardState()
      const mockCanvas = { scene: {} } as any
      state.canvas = mockCanvas

      domModule.expects('querySelector').withArgs('coords').returns(null)
      mockSettings.obfuscationsEnabled.value = true
      mockSettings.pieceStyle.value = 'cubes'
      pieceManagerModule
        .expects('updatePieces')
        .withArgs(mockCanvas, state.pieceManager, 'cubes', false, [])
        .returns(undefined)
      canvasModule.expects('render3D').withArgs(mockCanvas).returns(undefined)

      refreshPieces(state, mockSettings)
    })
  })
})

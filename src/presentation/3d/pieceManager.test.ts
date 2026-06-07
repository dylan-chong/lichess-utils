import { mockModule } from 'simone'
import { beforeEach, describe, expect, it } from 'vitest'
import { THREE } from '../../platform/three'
import type { Canvas3DState } from './canvas'
import { clearAllPieces, createPieceManager, updatePieces } from './pieceManager'

const dom = mockModule(import('../../platform/dom'))

function createMockRenderer(): THREE.WebGLRenderer {
  return {
    dispose: () => {},
  } as unknown as THREE.WebGLRenderer
}

function createMockBoard(): HTMLElement {
  const board = document.createElement('div')
  board.className = 'cg-board'
  Object.defineProperty(board, 'getBoundingClientRect', {
    value: () => ({ width: 800, height: 800, top: 0, left: 0, right: 800, bottom: 800 }),
  })
  return board
}

describe('pieceManager', () => {
  let scene: THREE.Scene
  let canvasState: Canvas3DState

  beforeEach(() => {
    scene = new THREE.Scene()
    canvasState = {
      scene,
      camera: new THREE.PerspectiveCamera(),
      renderer: createMockRenderer(),
      canvasElement: document.createElement('canvas'),
    }
  })

  describe('createPieceManager', () => {
    it('should return empty state', () => {
      const state = createPieceManager()

      expect(state.meshes).toEqual([])
      expect(state.meshMap).toBeInstanceOf(Map)
      expect(state.meshMap.size).toBe(0)
    })
  })

  describe('clearAllPieces', () => {
    it('should remove all meshes from scene and clear state', () => {
      const state = createPieceManager()
      const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial())
      const mesh2 = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial())

      scene.add(mesh1)
      scene.add(mesh2)
      state.meshes.push(mesh1, mesh2)
      state.meshMap.set('white-pawn-1', mesh1)
      state.meshMap.set('black-pawn-2', mesh2)

      expect(scene.children.length).toBe(2)

      clearAllPieces(canvasState, state)

      expect(scene.children.length).toBe(0)
      expect(state.meshes).toEqual([])
      expect(state.meshMap.size).toBe(0)
    })

    it('removes mesh without error when mesh has geometry and material', () => {
      const state = createPieceManager()
      const geometry = new THREE.BoxGeometry()
      const material = new THREE.MeshBasicMaterial()
      const mesh = new THREE.Mesh(geometry, material)

      scene.add(mesh)
      state.meshes.push(mesh)
      state.meshMap.set('white-king-1', mesh)

      clearAllPieces(canvasState, state)

      expect(scene.children.length).toBe(0)
      expect(state.meshes).toEqual([])
    })

    it('removes grouped meshes with children', () => {
      const state = createPieceManager()
      const group = new THREE.Group()
      const childMesh = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial())

      group.add(childMesh)
      scene.add(group)
      state.meshes.push(group)
      state.meshMap.set('white-king-1', group)

      clearAllPieces(canvasState, state)

      expect(scene.children.length).toBe(0)
      expect(state.meshes).toEqual([])
    })
  })

  describe('updatePieces', () => {
    it('should do nothing when board element does not exist', () => {
      const state = createPieceManager()
      dom.expects('querySelector').withArgs('cg-board').returns(null)

      updatePieces(canvasState, state, '3d', false, [])

      expect(state.meshes.length).toBe(0)
      expect(state.meshMap.size).toBe(0)
      expect(scene.children.length).toBe(0)
    })

    it('should create meshes for pieces in the DOM', () => {
      const state = createPieceManager()
      const board = createMockBoard()

      const piece1 = document.createElement('piece')
      piece1.className = 'white pawn'
      piece1.style.transform = 'translate(0px, 0px)'

      const piece2 = document.createElement('piece')
      piece2.className = 'black knight'
      piece2.style.transform = 'translate(100px, 100px)'

      board.appendChild(piece1)
      board.appendChild(piece2)

      dom.expects('querySelector').withArgs('cg-board').returns(board)

      updatePieces(canvasState, state, 'checker', false, [])

      expect(state.meshes.length).toBe(2)
      expect(state.meshMap.size).toBe(2)
      expect(scene.children.length).toBe(2)
    })

    it('should skip ghost pieces', () => {
      const state = createPieceManager()
      const board = createMockBoard()

      const piece = document.createElement('piece')
      piece.className = 'white pawn ghost'
      piece.style.transform = 'translate(0px, 0px)'

      board.appendChild(piece)
      dom.expects('querySelector').withArgs('cg-board').returns(board)

      updatePieces(canvasState, state, 'checker', false, [])

      expect(state.meshes.length).toBe(0)
      expect(state.meshMap.size).toBe(0)
    })

    it('should skip pieces with invalid class names', () => {
      const state = createPieceManager()
      const board = createMockBoard()

      const piece = document.createElement('piece')
      piece.className = 'invalid-class-name'
      piece.style.transform = 'translate(0px, 0px)'

      board.appendChild(piece)
      dom.expects('querySelector').withArgs('cg-board').returns(board)

      updatePieces(canvasState, state, 'checker', false, [])

      expect(state.meshes.length).toBe(0)
      expect(state.meshMap.size).toBe(0)
    })

    it('should skip pieces without valid position', () => {
      const state = createPieceManager()
      const board = createMockBoard()

      const piece = document.createElement('piece')
      piece.className = 'white pawn'
      // No transform - position will be null

      board.appendChild(piece)
      dom.expects('querySelector').withArgs('cg-board').returns(board)

      updatePieces(canvasState, state, 'checker', false, [])

      expect(state.meshes.length).toBe(0)
      expect(state.meshMap.size).toBe(0)
    })

    it('should reuse existing mesh with same ID', () => {
      const state = createPieceManager()
      const board = createMockBoard()

      const piece = document.createElement('piece')
      piece.className = 'white pawn'
      piece.style.transform = 'translate(0px, 0px)'

      board.appendChild(piece)

      // First update
      dom.expects('querySelector').withArgs('cg-board').returns(board)
      updatePieces(canvasState, state, 'checker', false, [])
      const firstMesh = state.meshes[0]

      // Second update with same piece
      dom.expects('querySelector').withArgs('cg-board').returns(board)
      updatePieces(canvasState, state, 'checker', false, [])
      const secondMesh = state.meshes[0]

      expect(firstMesh).toBe(secondMesh)
      expect(state.meshes.length).toBe(1)
    })

    it('should reuse mesh of same type for moved pieces', () => {
      const state = createPieceManager()
      const board = createMockBoard()

      const piece = document.createElement('piece')
      piece.className = 'white pawn'
      piece.style.transform = 'translate(0px, 0px)'

      board.appendChild(piece)

      // First update
      dom.expects('querySelector').withArgs('cg-board').returns(board)
      updatePieces(canvasState, state, 'checker', false, [])
      const firstMesh = state.meshes[0]
      const firstId = Array.from(state.meshMap.keys())[0]

      // Move piece to new position
      piece.style.transform = 'translate(100px, 100px)'

      // Second update
      dom.expects('querySelector').withArgs('cg-board').returns(board)
      updatePieces(canvasState, state, 'checker', false, [])
      const secondMesh = state.meshes[0]
      const secondId = Array.from(state.meshMap.keys())[0]

      expect(firstMesh).toBe(secondMesh)
      expect(state.meshes.length).toBe(1)
      expect(firstId).not.toBe(secondId)
    })

    it('should remove meshes for pieces no longer on board', () => {
      const state = createPieceManager()
      const board = createMockBoard()

      const piece1 = document.createElement('piece')
      piece1.className = 'white pawn'
      piece1.style.transform = 'translate(0px, 0px)'

      const piece2 = document.createElement('piece')
      piece2.className = 'black knight'
      piece2.style.transform = 'translate(100px, 100px)'

      board.appendChild(piece1)
      board.appendChild(piece2)

      // First update with both pieces
      dom.expects('querySelector').withArgs('cg-board').returns(board)
      updatePieces(canvasState, state, 'checker', false, [])
      expect(state.meshes.length).toBe(2)

      // Remove piece2
      board.removeChild(piece2)

      // Second update
      dom.expects('querySelector').withArgs('cg-board').returns(board)
      updatePieces(canvasState, state, 'checker', false, [])
      expect(state.meshes.length).toBe(1)
      expect(scene.children.length).toBe(1)
    })

    it('should skip blindfold style pieces', () => {
      const state = createPieceManager()
      const board = createMockBoard()

      const piece = document.createElement('piece')
      piece.className = 'white pawn'
      piece.style.transform = 'translate(0px, 0px)'

      board.appendChild(piece)
      dom.expects('querySelector').withArgs('cg-board').returns(board)

      updatePieces(canvasState, state, 'blindfold', false, [])

      expect(state.meshes.length).toBe(0)
      expect(state.meshMap.size).toBe(0)
    })

    it('should rotate icons when board is not flipped', () => {
      const state = createPieceManager()
      const board = createMockBoard()

      const piece = document.createElement('piece')
      piece.className = 'white pawn'
      piece.style.transform = 'translate(0px, 0px)'

      board.appendChild(piece)
      dom.expects('querySelector').withArgs('cg-board').returns(board)

      // Mock createImage for icons style
      const mockImage = {
        crossOrigin: '',
        src: '',
        onload: null,
      } as unknown as HTMLImageElement
      dom.expects('createImage').withArgs().returns(mockImage)

      updatePieces(canvasState, state, 'icons', false, [])

      const mesh = state.meshes[0]
      expect(mesh.rotation.z).toBe(Math.PI)
    })

    it('should not rotate icons when board is flipped', () => {
      const state = createPieceManager()
      const board = createMockBoard()

      const piece = document.createElement('piece')
      piece.className = 'white pawn'
      piece.style.transform = 'translate(0px, 0px)'

      board.appendChild(piece)
      dom.expects('querySelector').withArgs('cg-board').returns(board)

      // Mock createImage for icons style
      const mockImage = {
        crossOrigin: '',
        src: '',
        onload: null,
      } as unknown as HTMLImageElement
      dom.expects('createImage').withArgs().returns(mockImage)

      updatePieces(canvasState, state, 'icons', true, [])

      const mesh = state.meshes[0]
      expect(mesh.rotation.z).toBe(0)
    })

    it('should hide pieces in blacked out quadrants', () => {
      const state = createPieceManager()
      const board = createMockBoard()

      // Top-left quadrant (quadrant 0)
      const piece1 = document.createElement('piece')
      piece1.className = 'white pawn'
      piece1.style.transform = 'translate(0px, 0px)'

      // Top-right quadrant (quadrant 1)
      const piece2 = document.createElement('piece')
      piece2.className = 'black knight'
      piece2.style.transform = 'translate(500px, 0px)'

      board.appendChild(piece1)
      board.appendChild(piece2)
      dom.expects('querySelector').withArgs('cg-board').returns(board)

      updatePieces(canvasState, state, 'checker', false, [0])

      expect(state.meshes[0].visible).toBe(false)
      expect(state.meshes[1].visible).toBe(true)
    })

    it('should show all pieces when no quadrants are blacked out', () => {
      const state = createPieceManager()
      const board = createMockBoard()

      const piece = document.createElement('piece')
      piece.className = 'white pawn'
      piece.style.transform = 'translate(0px, 0px)'

      board.appendChild(piece)
      dom.expects('querySelector').withArgs('cg-board').returns(board)

      updatePieces(canvasState, state, 'checker', false, [])

      expect(state.meshes[0].visible).toBe(true)
    })

    it('should parse position from computed transform matrix', () => {
      const state = createPieceManager()
      const board = createMockBoard()

      const piece = document.createElement('piece')
      piece.className = 'white pawn'
      // Simulate computed style with matrix transform
      Object.defineProperty(piece, 'style', {
        value: {
          transform: '',
        },
        writable: true,
      })

      // Mock getComputedStyle to return matrix
      const originalGetComputedStyle = window.getComputedStyle
      window.getComputedStyle = (el: Element) => {
        if (el === piece) {
          return {
            transform: 'matrix(1, 0, 0, 1, 50, 75)',
          } as CSSStyleDeclaration
        }
        return originalGetComputedStyle(el)
      }

      board.appendChild(piece)
      dom.expects('querySelector').withArgs('cg-board').returns(board)

      updatePieces(canvasState, state, 'checker', false, [])

      expect(state.meshes.length).toBe(1)
      expect(state.meshMap.size).toBe(1)

      window.getComputedStyle = originalGetComputedStyle
    })

    it('should store grid position in mesh userData', () => {
      const state = createPieceManager()
      const board = createMockBoard()

      const piece = document.createElement('piece')
      piece.className = 'white pawn'
      piece.style.transform = 'translate(100px, 200px)'

      board.appendChild(piece)
      dom.expects('querySelector').withArgs('cg-board').returns(board)

      updatePieces(canvasState, state, 'checker', false, [])

      const mesh = state.meshes[0]
      expect(mesh.userData.col).toBe(1)
      expect(mesh.userData.row).toBe(2)
    })

    it('creates meshes for all six piece types', () => {
      const state = createPieceManager()
      const board = createMockBoard()

      const pieceTypes = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king']
      for (let i = 0; i < pieceTypes.length; i++) {
        const piece = document.createElement('piece')
        piece.className = `white ${pieceTypes[i]}`
        piece.style.transform = `translate(${i * 100}px, 0px)`
        board.appendChild(piece)
      }

      dom.expects('querySelector').withArgs('cg-board').returns(board)

      updatePieces(canvasState, state, 'checker', false, [])

      expect(state.meshes.length).toBe(6)
    })

    it('hides pieces in bottom-right quadrant when blacked out', () => {
      const state = createPieceManager()
      const board = createMockBoard()

      const piece = document.createElement('piece')
      piece.className = 'white pawn'
      piece.style.transform = 'translate(500px, 500px)'

      board.appendChild(piece)
      dom.expects('querySelector').withArgs('cg-board').returns(board)

      updatePieces(canvasState, state, 'checker', false, [3])

      expect(state.meshes[0].visible).toBe(false)
    })

    it('hides pieces in bottom-left quadrant when blacked out', () => {
      const state = createPieceManager()
      const board = createMockBoard()

      const piece = document.createElement('piece')
      piece.className = 'white pawn'
      piece.style.transform = 'translate(0px, 500px)'

      board.appendChild(piece)
      dom.expects('querySelector').withArgs('cg-board').returns(board)

      updatePieces(canvasState, state, 'checker', false, [2])

      expect(state.meshes[0].visible).toBe(false)
    })

    it('parses transform with both x and y values', () => {
      const state = createPieceManager()
      const board = createMockBoard()

      const piece = document.createElement('piece')
      piece.className = 'white pawn'
      piece.style.transform = 'translate(50px, 100px)'

      board.appendChild(piece)
      dom.expects('querySelector').withArgs('cg-board').returns(board)

      updatePieces(canvasState, state, 'checker', false, [])

      expect(state.meshes.length).toBe(1)
      const mesh = state.meshes[0]
      expect(mesh.userData.col).toBeDefined()
      expect(mesh.userData.row).toBeDefined()
    })

    it('falls back to inline transform when computed transform is invalid', () => {
      const state = createPieceManager()
      const board = createMockBoard()

      const piece = document.createElement('piece')
      piece.className = 'white pawn'
      piece.style.transform = 'translate(0px, 0px)'

      // Mock getComputedStyle to return invalid matrix format
      const originalGetComputedStyle = window.getComputedStyle
      window.getComputedStyle = (el: Element) => {
        if (el === piece) {
          return {
            transform: 'invalid-transform-format',
          } as CSSStyleDeclaration
        }
        return originalGetComputedStyle(el)
      }

      board.appendChild(piece)
      dom.expects('querySelector').withArgs('cg-board').returns(board)

      updatePieces(canvasState, state, 'checker', false, [])

      expect(state.meshes.length).toBe(1)

      window.getComputedStyle = originalGetComputedStyle
    })
  })

  describe('edge cases', () => {
    it('removes mesh with array material without error', () => {
      const state = createPieceManager()
      const geometry = new THREE.BoxGeometry()
      const material1 = new THREE.MeshBasicMaterial()
      const material2 = new THREE.MeshBasicMaterial()
      const mesh = new THREE.Mesh(geometry, [material1, material2])

      scene.add(mesh)
      state.meshes.push(mesh)
      state.meshMap.set('test-piece', mesh)

      clearAllPieces(canvasState, state)

      expect(scene.children.length).toBe(0)
      expect(state.meshes).toEqual([])
    })

    it('removes piece from map when mesh not found in meshes array', () => {
      const state = createPieceManager()
      const board = createMockBoard()

      const piece = document.createElement('piece')
      piece.className = 'white pawn'
      piece.style.transform = 'translate(0px, 0px)'

      board.appendChild(piece)

      dom.expects('querySelector').withArgs('cg-board').returns(board)
      updatePieces(canvasState, state, 'checker', false, [])
      expect(state.meshes.length).toBe(1)

      state.meshes = []
      board.removeChild(piece)

      dom.expects('querySelector').withArgs('cg-board').returns(board)
      updatePieces(canvasState, state, 'checker', false, [])

      expect(state.meshMap.size).toBe(0)
    })

    it('parses translate with only x value, defaults y to zero', () => {
      const state = createPieceManager()
      const board = createMockBoard()

      const piece = document.createElement('piece')
      piece.className = 'white pawn'
      piece.style.transform = 'translate(100px)'

      board.appendChild(piece)
      dom.expects('querySelector').withArgs('cg-board').returns(board)

      updatePieces(canvasState, state, 'checker', false, [])

      expect(state.meshes.length).toBe(1)
      const mesh = state.meshes[0]
      expect(mesh.userData.row).toBe(0)
    })

    it('removes non-mesh Object3D without error', () => {
      const state = createPieceManager()
      const obj = new THREE.Object3D()

      scene.add(obj)
      state.meshes.push(obj)
      state.meshMap.set('test-object', obj)

      clearAllPieces(canvasState, state)

      expect(state.meshes).toEqual([])
      expect(state.meshMap.size).toBe(0)
    })
  })
})

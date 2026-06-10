import { mockModule } from 'simone'
import { describe, it } from 'vitest'
import { AnnotationType } from '../../constants/annotations'
import type { DrawAnnotation } from '../../domain/commands/commandParser'
import { THREE } from '../../platform/three'
import { handleDrawCommand } from './handleDrawCommand'

const commandParser = mockModule(import('../../domain/commands/commandParser'))
const annotations = mockModule(import('../../presentation/non-preact-components/annotations'))
const drawings3d = mockModule(import('../../presentation/3d/drawings3d'))

describe('handleDrawCommand', () => {
  const mockAnnotationsState = {
    svg: document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
  }
  const mockDrawings3DState = { objects: [] }

  function createMockRenderer(): THREE.WebGLRenderer {
    return {
      dispose: () => {},
    } as unknown as THREE.WebGLRenderer
  }

  it('draws 2D annotations when custom board is not active', () => {
    const mockCustomBoardState = {
      canvas: null,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }

    const parsedAnnotations: DrawAnnotation[] = [
      { type: AnnotationType.CIRCLE, square: 'e4' },
      { type: AnnotationType.ARROW, from: 'e2', to: 'e4' },
    ]

    commandParser.expects('parseDrawCommand').withArgs('-e4,e2e4').returns(parsedAnnotations)

    annotations
      .expects('drawAnnotations')
      .withArgs(mockAnnotationsState, parsedAnnotations)
      .returns(undefined)

    handleDrawCommand('-e4,e2e4', mockAnnotationsState, mockCustomBoardState, mockDrawings3DState)
  })

  it('draws 3D annotations when custom board is active', () => {
    const scene = new THREE.Scene()
    const mockCanvas3DState = {
      scene,
      camera: new THREE.PerspectiveCamera(),
      renderer: createMockRenderer(),
      canvasElement: document.createElement('canvas'),
    }

    const mockCustomBoardState = {
      canvas: mockCanvas3DState,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }

    const parsedAnnotations: DrawAnnotation[] = [
      { type: AnnotationType.CIRCLE, square: 'e4' },
      { type: AnnotationType.ARROW, from: 'e2', to: 'e4' },
    ]

    commandParser.expects('parseDrawCommand').withArgs('-e4,e2e4').returns(parsedAnnotations)

    drawings3d
      .expects('draw3DAnnotations')
      .withArgs(mockCanvas3DState, mockDrawings3DState, parsedAnnotations)
      .returns(undefined)

    handleDrawCommand('-e4,e2e4', mockAnnotationsState, mockCustomBoardState, mockDrawings3DState)
  })

  it('clears 2D annotations when given empty draw command and custom board not active', () => {
    const mockCustomBoardState = {
      canvas: null,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }

    commandParser.expects('parseDrawCommand').withArgs('-').returns([])

    annotations.expects('drawAnnotations').withArgs(mockAnnotationsState, []).returns(undefined)

    handleDrawCommand('-', mockAnnotationsState, mockCustomBoardState, mockDrawings3DState)
  })

  it('clears 3D annotations when given empty draw command and custom board is active', () => {
    const scene = new THREE.Scene()
    const mockCanvas3DState = {
      scene,
      camera: new THREE.PerspectiveCamera(),
      renderer: createMockRenderer(),
      canvasElement: document.createElement('canvas'),
    }

    const mockCustomBoardState = {
      canvas: mockCanvas3DState,
      pieceManager: { meshes: [], meshMap: new Map() },
      boardPlaneName: 'boardPlane',
    }

    commandParser.expects('parseDrawCommand').withArgs('-').returns([])

    drawings3d
      .expects('draw3DAnnotations')
      .withArgs(mockCanvas3DState, mockDrawings3DState, [])
      .returns(undefined)

    handleDrawCommand('-', mockAnnotationsState, mockCustomBoardState, mockDrawings3DState)
  })
})

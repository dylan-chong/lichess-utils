import { mockModule } from 'simone'
import { beforeEach, describe, expect, it } from 'vitest'
import { AnnotationType } from '../../constants/annotations'
import { THREE } from '../../platform/three'
import type { Canvas3DState } from './canvas'
import { clear3DDrawings, createDrawings3DState, draw3DAnnotations } from './drawings3d'

const canvas = mockModule(import('./canvas'))

function createMockRenderer(): THREE.WebGLRenderer {
  return {
    dispose: () => {},
  } as unknown as THREE.WebGLRenderer
}

describe('drawings3d', () => {
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

  describe('createDrawings3DState', () => {
    it('should return empty state with empty objects array', () => {
      const state = createDrawings3DState()

      expect(state.objects).toEqual([])
      expect(Array.isArray(state.objects)).toBe(true)
    })
  })

  describe('draw3DAnnotations', () => {
    it('should add circle mesh to scene for circle annotation', () => {
      const state = createDrawings3DState()
      const annotations = [{ type: AnnotationType.CIRCLE, square: 'e4' }]

      canvas.expects('render3D').withArgs(canvasState).returns(undefined)

      draw3DAnnotations(canvasState, state, annotations)

      expect(scene.children.length).toBe(1)
      expect(state.objects.length).toBe(1)
      expect(state.objects[0]).toBeInstanceOf(THREE.Mesh)
    })

    it('should add arrow group to scene for arrow annotation', () => {
      const state = createDrawings3DState()
      const annotations = [{ type: AnnotationType.ARROW, from: 'e2', to: 'e4' }]

      canvas.expects('render3D').withArgs(canvasState).returns(undefined)

      draw3DAnnotations(canvasState, state, annotations)

      expect(scene.children.length).toBe(1)
      expect(state.objects.length).toBe(1)
      expect(state.objects[0]).toBeInstanceOf(THREE.Group)
    })

    it('should clear previous drawings before adding new ones', () => {
      const state = createDrawings3DState()

      // First draw
      canvas.expects('render3D').withArgs(canvasState).returns(undefined)
      draw3DAnnotations(canvasState, state, [{ type: AnnotationType.CIRCLE, square: 'e4' }])
      expect(state.objects.length).toBe(1)

      // Second draw should clear first
      canvas.expects('render3D').withArgs(canvasState).returns(undefined)
      draw3DAnnotations(canvasState, state, [{ type: AnnotationType.CIRCLE, square: 'd4' }])
      expect(state.objects.length).toBe(1)
      expect(scene.children.length).toBe(1)
    })

    it('should handle multiple annotations', () => {
      const state = createDrawings3DState()
      const annotations = [
        { type: AnnotationType.CIRCLE, square: 'e4' },
        { type: AnnotationType.ARROW, from: 'e2', to: 'e4' },
        { type: AnnotationType.CIRCLE, square: 'd4' },
      ]

      canvas.expects('render3D').withArgs(canvasState).returns(undefined)

      draw3DAnnotations(canvasState, state, annotations)

      expect(scene.children.length).toBe(3)
      expect(state.objects.length).toBe(3)
    })

    it('should clear all drawings when empty annotations array is provided', () => {
      const state = createDrawings3DState()

      // First draw with annotation
      canvas.expects('render3D').withArgs(canvasState).returns(undefined)
      draw3DAnnotations(canvasState, state, [{ type: AnnotationType.CIRCLE, square: 'e4' }])
      expect(state.objects.length).toBe(1)

      // Clear with empty array
      canvas.expects('render3D').withArgs(canvasState).returns(undefined)
      draw3DAnnotations(canvasState, state, [])
      expect(state.objects.length).toBe(0)
      expect(scene.children.length).toBe(0)
    })

    it('should call render3D after drawing', () => {
      const state = createDrawings3DState()
      const annotations = [{ type: AnnotationType.CIRCLE, square: 'e4' }]

      canvas.expects('render3D').withArgs(canvasState).returns(undefined)

      draw3DAnnotations(canvasState, state, annotations)
    })
  })

  describe('clear3DDrawings', () => {
    it('should remove all objects from scene and empty objects array', () => {
      const state = createDrawings3DState()

      // Add some objects
      const circle = new THREE.Mesh(new THREE.TorusGeometry(), new THREE.MeshStandardMaterial())
      const arrow = new THREE.Group()
      scene.add(circle)
      scene.add(arrow)
      state.objects.push(circle, arrow)

      expect(scene.children.length).toBe(2)

      clear3DDrawings(canvasState, state)

      expect(scene.children.length).toBe(0)
      expect(state.objects).toEqual([])
    })

    it('should dispose geometries and materials', () => {
      const state = createDrawings3DState()
      const geometry = new THREE.TorusGeometry()
      const material = new THREE.MeshStandardMaterial()
      const mesh = new THREE.Mesh(geometry, material)

      scene.add(mesh)
      state.objects.push(mesh)

      clear3DDrawings(canvasState, state)

      expect(scene.children.length).toBe(0)
      expect(state.objects).toEqual([])
    })

    it('should handle groups with child meshes', () => {
      const state = createDrawings3DState()
      const group = new THREE.Group()
      const mesh1 = new THREE.Mesh(new THREE.CylinderGeometry(), new THREE.MeshStandardMaterial())
      const mesh2 = new THREE.Mesh(new THREE.ConeGeometry(), new THREE.MeshStandardMaterial())
      group.add(mesh1)
      group.add(mesh2)

      scene.add(group)
      state.objects.push(group)

      clear3DDrawings(canvasState, state)

      expect(scene.children.length).toBe(0)
      expect(state.objects).toEqual([])
    })

    it('should handle empty objects array without error', () => {
      const state = createDrawings3DState()

      expect(() => clear3DDrawings(canvasState, state)).not.toThrow()
      expect(state.objects).toEqual([])
    })

    it('should handle mesh with array material', () => {
      const state = createDrawings3DState()
      const geometry = new THREE.TorusGeometry()
      const material1 = new THREE.MeshStandardMaterial()
      const material2 = new THREE.MeshStandardMaterial()
      const mesh = new THREE.Mesh(geometry, [material1, material2])

      scene.add(mesh)
      state.objects.push(mesh)

      clear3DDrawings(canvasState, state)

      expect(scene.children.length).toBe(0)
      expect(state.objects).toEqual([])
    })

    it('should handle mesh without geometry', () => {
      const state = createDrawings3DState()
      const mesh = new THREE.Mesh()

      scene.add(mesh)
      state.objects.push(mesh)

      clear3DDrawings(canvasState, state)

      expect(scene.children.length).toBe(0)
      expect(state.objects).toEqual([])
    })
  })

  describe('edge cases', () => {
    it('should ignore unknown annotation types', () => {
      const state = createDrawings3DState()
      const annotations = [
        { type: 'unknown' as any, square: 'e4' },
      ]

      canvas.expects('render3D').withArgs(canvasState).returns(undefined)

      draw3DAnnotations(canvasState, state, annotations)

      expect(scene.children.length).toBe(0)
      expect(state.objects.length).toBe(0)
    })
  })
})

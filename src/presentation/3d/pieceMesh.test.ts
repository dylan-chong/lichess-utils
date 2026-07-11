import { mockModule } from 'simone'
import { describe, expect, it, vi } from 'vitest'
import { THREE } from '../../platform/three'
import { createPieceMesh, loadTextureFromImage } from './pieceMesh'

const dom = mockModule(import('../../platform/dom'))

describe('createPieceMesh', () => {
  describe('3d style', () => {
    it('creates 3d mesh for pawn', () => {
      const mesh = createPieceMesh('pawn', true, '3d')
      expect(mesh).toBeInstanceOf(THREE.Object3D)
    })

    it('creates 3d mesh for rook', () => {
      const mesh = createPieceMesh('rook', true, '3d')
      expect(mesh).toBeInstanceOf(THREE.Object3D)
    })

    it('creates 3d mesh for bishop', () => {
      const mesh = createPieceMesh('bishop', true, '3d')
      expect(mesh).toBeInstanceOf(THREE.Object3D)
    })

    it('creates 3d mesh for queen', () => {
      const mesh = createPieceMesh('queen', true, '3d')
      expect(mesh).toBeInstanceOf(THREE.Object3D)
    })

    it('creates 3d mesh for king as group with children', () => {
      const mesh = createPieceMesh('king', true, '3d')
      expect(mesh).toBeInstanceOf(THREE.Object3D)
      expect(mesh?.children.length).toBeGreaterThan(0)
    })

    it('creates 3d knight with correct rotation for white', () => {
      const mesh = createPieceMesh('knight', true, '3d')
      expect(mesh).toBeInstanceOf(THREE.Object3D)
      expect((mesh as any).rotation.y).toBe(0)
    })

    it('creates 3d knight with correct rotation for black', () => {
      const mesh = createPieceMesh('knight', false, '3d')
      expect(mesh).toBeInstanceOf(THREE.Object3D)
      expect((mesh as any).rotation.y).toBeCloseTo(Math.PI)
    })

    it('creates 3d pieces for black color', () => {
      const mesh = createPieceMesh('pawn', false, '3d')
      expect(mesh).toBeInstanceOf(THREE.Object3D)
    })
  })

  describe('checker style', () => {
    it('creates checker mesh for white', () => {
      const mesh = createPieceMesh('rook', true, 'checker')
      expect(mesh).toBeInstanceOf(THREE.Object3D)
    })

    it('creates checker mesh for black', () => {
      const mesh = createPieceMesh('rook', false, 'checker')
      expect(mesh).toBeInstanceOf(THREE.Object3D)
    })
  })

  describe('checker-grey style', () => {
    it('creates checker-grey mesh for white', () => {
      const mesh = createPieceMesh('rook', true, 'checker-grey')
      expect(mesh).toBeInstanceOf(THREE.Object3D)
    })

    it('creates checker-grey mesh for black', () => {
      const mesh = createPieceMesh('rook', false, 'checker-grey')
      expect(mesh).toBeInstanceOf(THREE.Object3D)
    })
  })

  describe('blindfold style', () => {
    it('returns null for blindfold', () => {
      const mesh = createPieceMesh('pawn', true, 'blindfold')
      expect(mesh).toBeNull()
    })
  })

  describe('icons style', () => {
    it('creates icon mesh for default style', () => {
      const mockImage = {
        crossOrigin: '',
        src: '',
        onload: null,
      } as unknown as HTMLImageElement
      dom.expects('createImage').withArgs().returns(mockImage)

      const mesh = createPieceMesh('queen', true, 'icons')
      expect(mesh).toBeInstanceOf(THREE.Object3D)
    })

    it('creates icon mesh for white pieces', () => {
      const mockImage = {
        crossOrigin: '',
        src: '',
        onload: null,
      } as unknown as HTMLImageElement
      dom.expects('createImage').withArgs().returns(mockImage)

      const mesh = createPieceMesh('knight', true, 'icons')
      expect(mesh).toBeInstanceOf(THREE.Object3D)
    })

    it('creates icon mesh for black pieces', () => {
      const mockImage = {
        crossOrigin: '',
        src: '',
        onload: null,
      } as unknown as HTMLImageElement
      dom.expects('createImage').withArgs().returns(mockImage)

      const mesh = createPieceMesh('knight', false, 'icons')
      expect(mesh).toBeInstanceOf(THREE.Object3D)
    })

    it('applies texture when image loads', () => {
      // Mock canvas to allow texture creation
      const mockContext = {
        drawImage: vi.fn(),
      }
      const mockCanvas = {
        width: 0,
        height: 0,
        getContext: vi.fn().mockReturnValue(mockContext),
      } as unknown as HTMLCanvasElement

      // Mock Image to capture the onload callback
      const capturedCallbacks: Array<() => void> = []
      const mockImage = {
        crossOrigin: '',
        src: '',
        set onload(fn: (() => void) | null) {
          if (fn !== null) {
            capturedCallbacks.push(fn)
          }
        },
        get onload(): (() => void) | null {
          return capturedCallbacks[0] ?? null
        },
      } as unknown as HTMLImageElement

      dom.expects('createImage').withArgs().returns(mockImage)
      dom.expects('createCanvas').withArgs().returns(mockCanvas)

      const mesh = createPieceMesh('pawn', true, 'icons')
      expect(mesh).toBeInstanceOf(THREE.Object3D)

      const material = (mesh as any).material
      expect(material.map).toBeNull()

      // Trigger the onload callback
      expect(capturedCallbacks.length).toBeGreaterThan(0)
      capturedCallbacks[0]()
      expect(material.map).toBeInstanceOf(THREE.Texture)
    })
  })

  describe('unknown style (default fallback)', () => {
    it('creates icon mesh for unknown style (falls through to default)', () => {
      const mockImage = {
        crossOrigin: '',
        src: '',
        onload: null,
      } as unknown as HTMLImageElement
      dom.expects('createImage').withArgs().returns(mockImage)

      const mesh = createPieceMesh('bishop', true, 'unknown-style')
      expect(mesh).toBeInstanceOf(THREE.Object3D)
    })
  })

  describe('loadTextureFromImage', () => {
    it('creates texture when context is available', () => {
      const img = new Image()
      const material = new THREE.MeshBasicMaterial()

      // Mock canvas with a working context
      const mockContext = {
        drawImage: vi.fn(),
      }
      const mockCanvas = {
        width: 0,
        height: 0,
        getContext: vi.fn().mockReturnValue(mockContext),
      } as unknown as HTMLCanvasElement

      dom.expects('createCanvas').withArgs().returns(mockCanvas)

      loadTextureFromImage(img, material)

      // Verify texture was created and assigned
      expect(material.map).toBeInstanceOf(THREE.Texture)
      expect(mockContext.drawImage).toHaveBeenCalledWith(img, 0, 0, 256, 256)
    })

    it('does not create texture when context is unavailable', () => {
      const img = new Image()
      const material = new THREE.MeshBasicMaterial()

      // Mock canvas with null context
      const mockCanvas = {
        width: 0,
        height: 0,
        getContext: vi.fn().mockReturnValue(null),
      } as unknown as HTMLCanvasElement

      dom.expects('createCanvas').withArgs().returns(mockCanvas)

      loadTextureFromImage(img, material)

      // Should not have set a texture when context is null
      expect(material.map).toBeNull()
    })
  })
})

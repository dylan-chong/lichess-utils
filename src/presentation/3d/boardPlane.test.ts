import { describe, expect, it } from 'vitest'
import type { THREE } from '../../platform/three'
import { createBoardPlane } from './boardPlane'

describe('createBoardPlane', () => {
  it('creates 64 squares', () => {
    const plane = createBoardPlane([])
    expect(plane.children.length).toBe(64)
  })

  it('positions first square at (-3.5, 0, -3.5)', () => {
    const plane = createBoardPlane([])
    expect(plane.children[0].position.x).toBe(-3.5)
    expect(plane.children[0].position.z).toBe(-3.5)
  })

  it('rotates all squares to be horizontal', () => {
    const plane = createBoardPlane([])
    for (const child of plane.children) {
      expect(child.rotation.x).toBeCloseTo(-Math.PI / 2)
    }
  })

  it('has no black squares when blackedOutQuadrants is empty', () => {
    const plane = createBoardPlane([])
    for (const child of plane.children) {
      const mesh = child as THREE.Mesh
      const material = mesh.material as THREE.MeshBasicMaterial
      expect([0xeeeed2, 0x769656]).toContain(material.color.getHex())
    }
  })

  it('blacks out quadrant 0 (top-left)', () => {
    const plane = createBoardPlane([0])
    // First square (col=0, row=0) should be black
    const first = plane.children[0] as THREE.Mesh
    const material = first.material as THREE.MeshBasicMaterial
    expect(material.color.getHex()).toBe(0x000000)
  })

  it('blacks out quadrant 3 (bottom-right)', () => {
    const plane = createBoardPlane([3])
    // Square at col=4, row=4 (index = 4*8 + 4 = 36) should be black
    const square = plane.children[36] as THREE.Mesh
    const material = square.material as THREE.MeshBasicMaterial
    expect(material.color.getHex()).toBe(0x000000)
  })

  it('does not black out non-specified quadrants', () => {
    const plane = createBoardPlane([0])
    // Square at col=4, row=0 (quadrant 1, index = 4) should NOT be black
    const square = plane.children[4] as THREE.Mesh
    const material = square.material as THREE.MeshBasicMaterial
    expect([0xeeeed2, 0x769656]).toContain(material.color.getHex())
  })
})

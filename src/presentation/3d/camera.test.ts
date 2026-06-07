import { describe, expect, it } from 'vitest'
import { THREE } from '../../platform/three'
import { updateCameraAngle } from './camera'
import type { Canvas3DState } from './canvas'

function createMockCanvasState(): Canvas3DState {
  return {
    camera: new THREE.PerspectiveCamera(),
    scene: new THREE.Scene(),
    renderer: { render: () => {} } as any,
    canvasElement: document.createElement('canvas'),
  }
}

describe('updateCameraAngle', () => {
  it('positions camera overhead at 0 degrees', () => {
    const state = createMockCanvasState()
    updateCameraAngle(state, 0, false)
    expect(state.camera.position.y).toBeCloseTo(15, 0)
    expect(state.camera.position.z).toBeCloseTo(0, 0)
    expect(state.camera.position.x).toBe(0)
  })

  it('tilts camera at 45 degrees (non-flipped)', () => {
    const state = createMockCanvasState()
    updateCameraAngle(state, 45, false)
    expect(state.camera.position.y).toBeCloseTo(10.6, 0)
    expect(state.camera.position.z).toBeLessThan(0) // negative for non-flipped
  })

  it('inverts z direction when flipped', () => {
    const state = createMockCanvasState()
    updateCameraAngle(state, 45, true)
    expect(state.camera.position.z).toBeGreaterThan(0) // positive for flipped
  })

  it('sets camera up vector for non-flipped', () => {
    const state = createMockCanvasState()
    updateCameraAngle(state, 30, false)
    expect(state.camera.up.z).toBeCloseTo(1)
  })

  it('sets camera up vector for flipped', () => {
    const state = createMockCanvasState()
    updateCameraAngle(state, 30, true)
    expect(state.camera.up.z).toBeCloseTo(-1)
  })
})

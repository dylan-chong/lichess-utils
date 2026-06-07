import type { Canvas3DState } from './canvas'

export function updateCameraAngle(
  state: Canvas3DState,
  angleDegrees: number,
  isFlipped: boolean
): void {
  const angleRad = (angleDegrees * Math.PI) / 180
  const distance = 15

  const y = Math.cos(angleRad) * distance
  const z = Math.sin(angleRad) * distance
  const zDirection = isFlipped ? 1 : -1

  state.camera.position.set(0, y, z * zDirection)
  state.camera.up.set(0, 0, -1 * zDirection)
  state.camera.lookAt(0, 0, 0)
}

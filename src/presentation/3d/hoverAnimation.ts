import { cancelAnimation, requestAnimation } from '../../platform/animationFrame'
import { type Canvas3DState, render3D } from './canvas'

const OSCILLATION_ANGLE = 1.95
const OSCILLATION_PERIOD_MS = 2000
const OSCILLATION_Y_ANGLE = 1.95
const OSCILLATION_Y_PERIOD_MS = 2500

export interface HoverAnimationState {
  animationId: number | null
  startTime: number | null
}

export function createHoverAnimationState(): HoverAnimationState {
  return { animationId: null, startTime: null }
}

export function startHoverAnimation(
  hoverState: HoverAnimationState,
  canvasState: Canvas3DState,
  getParams: () => { baseAngle: number; scale: number; isFlipped: boolean }
): void {
  if (hoverState.animationId !== null) return
  hoverState.startTime = performance.now()

  const animate = (timestamp: number) => {
    const params = getParams()
    if (params.scale === 0) {
      stopHoverAnimation(hoverState)
      return
    }

    const elapsed = timestamp - (hoverState.startTime ?? timestamp)
    const { baseAngle, scale, isFlipped } = params

    const oscillationX = Math.sin(elapsed / OSCILLATION_PERIOD_MS) * OSCILLATION_ANGLE * scale
    const angleX = baseAngle + oscillationX
    const angleRad = (angleX * Math.PI) / 180

    const distance = 15
    const y = Math.cos(angleRad) * distance
    const z = Math.sin(angleRad) * distance
    const zDirection = isFlipped ? 1 : -1

    canvasState.camera.position.set(0, y, z * zDirection)

    const oscillationZ = Math.sin(elapsed / OSCILLATION_Y_PERIOD_MS) * OSCILLATION_Y_ANGLE * scale
    const oscillationZRad = (oscillationZ * Math.PI) / 180
    canvasState.camera.position.x = Math.sin(oscillationZRad) * distance * 0.1 * scale

    canvasState.camera.up.set(0, 0, -1 * zDirection)
    canvasState.camera.lookAt(0, 0, 0)

    render3D(canvasState)
    hoverState.animationId = requestAnimation(animate)
  }

  hoverState.animationId = requestAnimation(animate)
}

export function stopHoverAnimation(hoverState: HoverAnimationState): void {
  if (hoverState.animationId !== null) {
    cancelAnimation(hoverState.animationId)
    hoverState.animationId = null
  }
  hoverState.startTime = null
}

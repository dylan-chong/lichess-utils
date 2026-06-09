import { getBlackedOutQuadrants, getTimingMs } from '../../domain/chess/blackSegments'
import { querySelector } from '../../platform/dom'
import { createBoardPlane } from '../../presentation/3d/boardPlane'
import { render3D } from '../../presentation/3d/canvas'
import { updatePieces } from '../../presentation/3d/pieceManager'
import type { SettingsStore } from '../settings/settingsStore'
import type { CustomBoardState } from './handleCustomBoard'

export interface BlackSegmentsState {
  counter: number
  intervalId: ReturnType<typeof setInterval> | null
}

export function createBlackSegmentsState(): BlackSegmentsState {
  return { counter: 0, intervalId: null }
}

export function startBlackSegmentsInterval(
  segState: BlackSegmentsState,
  customBoardState: CustomBoardState,
  settings: SettingsStore
): void {
  stopBlackSegmentsInterval(segState)

  const timingMs = getTimingMs(settings.blackSegmentsTiming.value)
  if (timingMs === null) return

  segState.intervalId = setInterval(() => {
    segState.counter++
    applyBlackSegments(segState, customBoardState, settings)
  }, timingMs)
}

export function stopBlackSegmentsInterval(segState: BlackSegmentsState): void {
  if (segState.intervalId !== null) {
    clearInterval(segState.intervalId)
    segState.intervalId = null
  }
}

export function applyBlackSegments(
  segState: BlackSegmentsState,
  customBoardState: CustomBoardState,
  settings: SettingsStore
): void {
  if (!customBoardState.canvas) return

  const quadrants = getBlackedOutQuadrants(settings.blackSegments.value, segState.counter)

  // Rebuild board plane
  const existingBoard = customBoardState.canvas.scene.getObjectByName(
    customBoardState.boardPlaneName
  )
  if (existingBoard) {
    customBoardState.canvas.scene.remove(existingBoard)
  }
  const newBoard = createBoardPlane(quadrants)
  newBoard.name = customBoardState.boardPlaneName
  customBoardState.canvas.scene.add(newBoard)

  // Update piece visibility
  const coords = querySelector('coords')
  const isFlipped = coords?.classList.contains('black') ?? false
  const style = settings.obfuscationsEnabled.value ? settings.pieceStyle.value : 'icons'
  updatePieces(customBoardState.canvas, customBoardState.pieceManager, style, isFlipped, quadrants)

  render3D(customBoardState.canvas)
}

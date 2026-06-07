import { DomSelector } from '../../constants/dom'
import { querySelector } from '../../platform/dom'
import { createBoardPlane } from '../../presentation/3d/boardPlane'
import {
  type Canvas3DState,
  create3DCanvas,
  destroy3DCanvas,
  render3D,
} from '../../presentation/3d/canvas'
import {
  type PieceManagerState,
  clearAllPieces,
  createPieceManager,
  updatePieces,
} from '../../presentation/3d/pieceManager'
import type { SettingsStore } from '../settings/settingsStore'

export interface CustomBoardState {
  canvas: Canvas3DState | null
  pieceManager: PieceManagerState
  boardPlaneName: string
}

export function createCustomBoardState(): CustomBoardState {
  return {
    canvas: null,
    pieceManager: createPieceManager(),
    boardPlaneName: 'boardPlane',
  }
}

export function initCustomBoard(state: CustomBoardState, settings: SettingsStore): void {
  if (state.canvas) return

  const board = querySelector(DomSelector.BOARD) as HTMLElement | null
  if (board) {
    board.style.opacity = '0'
    const pieces = board.querySelectorAll('piece')
    for (const piece of pieces) {
      ;(piece as HTMLElement).style.visibility = 'hidden'
    }
  }

  state.canvas = create3DCanvas()

  const boardPlane = createBoardPlane([])
  boardPlane.name = state.boardPlaneName
  state.canvas.scene.add(boardPlane)

  const isFlipped = getIsFlipped()
  const style = getPieceStyle(settings)
  updatePieces(state.canvas, state.pieceManager, style, isFlipped, [])
  render3D(state.canvas)
}

export function destroyCustomBoard(state: CustomBoardState): void {
  if (!state.canvas) return

  clearAllPieces(state.canvas, state.pieceManager)
  destroy3DCanvas(state.canvas)
  state.canvas = null

  const board = querySelector(DomSelector.BOARD) as HTMLElement | null
  if (board) {
    board.style.opacity = ''
    const pieces = board.querySelectorAll('piece')
    for (const piece of pieces) {
      ;(piece as HTMLElement).style.visibility = ''
    }
  }
}

export function refreshPieces(state: CustomBoardState, settings: SettingsStore): void {
  if (!state.canvas) return

  const isFlipped = getIsFlipped()
  const style = getPieceStyle(settings)
  updatePieces(state.canvas, state.pieceManager, style, isFlipped, [])
  render3D(state.canvas)
}

function getIsFlipped(): boolean {
  const coords = querySelector(DomSelector.COORDS)
  return coords?.classList.contains('black') ?? false
}

function getPieceStyle(settings: SettingsStore): string {
  if (settings.obfuscationsEnabled.value) {
    return settings.pieceStyle.value
  }
  return settings.pieceStyle.value === '3d' ? '3d' : 'icons'
}

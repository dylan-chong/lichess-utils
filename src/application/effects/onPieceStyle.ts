import { effect } from '@preact/signals-core'
import { DomSelector } from '../../constants/dom'
import { querySelector } from '../../platform/dom'
import { render3D } from '../../presentation/3d/canvas'
import { clearAllPieces, updatePieces } from '../../presentation/3d/pieceManager'
import type { CustomBoardState } from '../handlers/handleCustomBoard'
import type { SettingsStore } from '../settings/settingsStore'

export function setupPieceStyleEffect(
  customBoardState: CustomBoardState,
  settings: SettingsStore
): () => void {
  return effect(() => {
    settings.pieceStyle.value
    settings.obfuscationsEnabled.value
    if (!customBoardState.canvas) return

    const coords = querySelector(DomSelector.COORDS)
    const isFlipped = coords?.classList.contains('black') ?? false
    const style = settings.obfuscationsEnabled.value
      ? settings.pieceStyle.value
      : settings.pieceStyle.value === '3d'
        ? '3d'
        : 'icons'

    clearAllPieces(customBoardState.canvas, customBoardState.pieceManager)
    updatePieces(customBoardState.canvas, customBoardState.pieceManager, style, isFlipped, [])
    render3D(customBoardState.canvas)
  })
}

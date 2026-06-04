import { PlayerColor, type Quadrant } from '../../constants/chess'
import { SpeechCommand } from '../../constants/commands'
import { filterQuadrant } from '../../domain/chess/pieceGrouping'
import {
  generateAllPiecesText,
  generateColorText,
  generateQuadrantText,
} from '../../domain/speech/speechText'
import { speakText, stopSpeaking } from '../../platform/speechApi'
import { readPiecePositions } from '../services/boardReader/reader'
import type { SettingsStore } from '../settings/settingsStore'

export function handleSpeechCommand(command: string, settings: SettingsStore): void {
  if (command === SpeechCommand.STOP) {
    stopSpeaking()
    return
  }

  const pieces = readPiecePositions()

  if (command === SpeechCommand.ALL) {
    const text = generateAllPiecesText(pieces)
    speakText(text, settings.speakRate.value)
    return
  }

  if (command === SpeechCommand.WHITE || command === SpeechCommand.BLACK) {
    const color = command === SpeechCommand.WHITE ? PlayerColor.WHITE : PlayerColor.BLACK
    const text = generateColorText(pieces, color)
    speakText(text, settings.speakRate.value)
    return
  }

  // Quadrant commands: wk, wq, bk, bq
  const quadrant = command as Quadrant
  const filtered = filterQuadrant(pieces, quadrant)
  const text = generateQuadrantText(filtered)
  speakText(text, settings.speakRate.value)
}

import { speak, stopSpeaking } from '../adapters-speech/speechSynthesizer'
import { PlayerColor, type Quadrant, SpeechCommand } from '../constants'
import { readPiecePositions } from '../dom/boardReader'
import { filterQuadrant } from '../domain/chess/pieceGrouping'
import { generateAllPiecesText, generateColorText, generateQuadrantText } from '../pure/speechText'
import { settings } from '../settings/settingsStore'

export function handleSpeechCommand(command: string): void {
  if (command === SpeechCommand.STOP) {
    stopSpeaking()
    return
  }

  const pieces = readPiecePositions()

  if (command === SpeechCommand.ALL) {
    const text = generateAllPiecesText(pieces)
    speak(text, settings.speakRate.value)
    return
  }

  if (command === SpeechCommand.WHITE || command === SpeechCommand.BLACK) {
    const color = command === SpeechCommand.WHITE ? PlayerColor.WHITE : PlayerColor.BLACK
    const text = generateColorText(pieces, color)
    speak(text, settings.speakRate.value)
    return
  }

  // Quadrant commands: wk, wq, bk, bq
  const quadrant = command as Quadrant
  const filtered = filterQuadrant(pieces, quadrant)
  const text = generateQuadrantText(filtered)
  speak(text, settings.speakRate.value)
}

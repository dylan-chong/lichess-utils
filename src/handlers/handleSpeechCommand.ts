import { readPiecePositions } from '../dom/boardReader'
import { filterQuadrant, type Quadrant } from '../pure/pieceGrouping'
import { generateQuadrantText, generateAllPiecesText, generateColorText } from '../pure/speechText'
import { speak, stopSpeaking } from '../browser/speechSynthesizer'
import { settings } from '../settings/settingsStore'

export function handleSpeechCommand(command: string): void {
  if (command === 'stop') {
    stopSpeaking()
    return
  }

  const pieces = readPiecePositions()

  if (command === 'all') {
    const text = generateAllPiecesText(pieces)
    speak(text, settings.speakRate.value)
    return
  }

  if (command === 'white' || command === 'black') {
    const text = generateColorText(pieces, command)
    speak(text, settings.speakRate.value)
    return
  }

  // Quadrant commands: wk, wq, bk, bq
  const quadrant = command as Quadrant
  const filtered = filterQuadrant(pieces, quadrant)
  const text = generateQuadrantText(filtered)
  speak(text, settings.speakRate.value)
}

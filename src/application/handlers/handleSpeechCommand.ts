import { PlayerColor, type Quadrant } from '../../constants/chess'
import { SpeechCommand } from '../../constants/commands'
import { filterQuadrant } from '../../domain/chess/pieceGrouping'
import {
  generateAllPiecesSegments,
  generateColorSegments,
  generateQuadrantSegments,
} from '../../domain/speech/speechText'
import { speakSegments, stopSpeaking } from '../../platform/speech'
import { getPlayerColor, readPiecePositions } from '../services/boardReader/reader'
import type { SettingsStore } from '../settings/settingsStore'

function speakWithAnnouncement(
  segments: string[],
  settings: SettingsStore,
  onFinished?: () => void
): void {
  const announcement = `you are ${getPlayerColor()}.`
  speakSegments(
    [announcement, ...segments],
    settings.speakRate.value,
    settings.pauseLength,
    onFinished,
    settings.voiceName.value
  )
}

export function handleSpeechCommand(
  command: string,
  settings: SettingsStore,
  onFinished?: () => void
): void {
  if (command === SpeechCommand.STOP) {
    stopSpeaking()
    return
  }

  const pieces = readPiecePositions()

  if (command === SpeechCommand.ALL) {
    const segments = generateAllPiecesSegments(pieces)
    speakWithAnnouncement(segments, settings, onFinished)
    return
  }

  if (command === SpeechCommand.WHITE || command === SpeechCommand.BLACK) {
    const color = command === SpeechCommand.WHITE ? PlayerColor.WHITE : PlayerColor.BLACK
    const segments = generateColorSegments(pieces, color)
    speakWithAnnouncement(segments, settings, onFinished)
    return
  }

  // Quadrant commands: wk, wq, bk, bq
  const quadrant = command as Quadrant
  const filtered = filterQuadrant(pieces, quadrant)
  const segments = generateQuadrantSegments(filtered)
  speakWithAnnouncement(segments, settings, onFinished)
}
